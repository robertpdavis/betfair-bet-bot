const { Apisetting, Config, Event, EventType, Market, Result, Runner, Scenario, Staking, System, User, Transaction } = require('../models');
const Betfairapi = require('./Betfairapi');
const { buildFilter, systemStatsCheck, marketStatsCheck } = require('../utils/bfHelpers');
const { processBets } = require('../utils/betSystems');

class BetfairController {

  constructor() {
    this.api = new Betfairapi;
    this.config = "";
    this.getConfig();
  }

  async getConfig() {
    const result = await Config.find();
    if (!result) { return [false, "Get config failed"] };

    const configs = {};
    result.map((configItem) => {
      configs[configItem.configKey] = configItem.configValue
    })

    this.config = configs;

    return configs;
  }

  async setSession(userId) {
    try {
      //Get the API settings for the user
      const apiSettings = await Apisetting.findOne({ userId: userId });
      if (!apiSettings) { return [false, "No API settings found for this user"] };

      //If API not enabled, don't proceed any further.
      if ((apiSettings.apiMode === 'Test' && !apiSettings.testApiEnabled) || (apiSettings.apiMode === 'Live' && !apiSettings.liveApiEnabled)) {
        return [false, "API disabled"];
      }

      //Check if live or test key 
      let apiKey = "";
      let session = "";
      if (apiSettings.apiMode === 'Live') {
        apiKey = apiSettings.apiKeyLive;
        session = apiSettings.liveSessionId;
      } else if (apiSettings.apiMode === 'Test') {
        apiKey = apiSettings.apiKeyTest;
        session = apiSettings.testSessionId;
      }

      this.api.apiKey = apiKey;
      this.api.sessionId = session;

      return [true, 'Session set'];

    } catch (e) {
      return [false, e]
    }
  }

  //Get a list of event types and store in DB
  async getEventTypes() {
    try {
      const res = await this.api.getAllEventTypes();
      if (res[0]) {
        const eventTypes = res[1].map((type) => {
          return { eventTypeId: type.eventType.id, name: type.eventType.name, used: true }
        });

        await EventType.deleteMany({});

        const result = await EventType.create(eventTypes);
        return [true, result];
      }
    } catch (e) {
      return [false, e]
    }
  }

  /*
  Get the events/markets available for each active system based on the system filter
  criteria and save to DB
  */
  async eventUpdate(systemId) {
    try {
      const startTime = new Date().getTime();
      //Clear data older then eventTimeOut  - 24 hours ago by default
      await this.clearMarketData(this.config.eventTimeOut);

      if (systemId === undefined || systemId === '') { return [false, 'No system Id provided.'] };

      //Get system details
      const system = await System.findById(systemId);
      if (!system) { return [false, "No details for system found. System Id:" + systemId] };

      const APIfilter = buildFilter(system, this.config);

      const params = '{"filter":{' + APIfilter + '}}';

      const res = await this.api.getEvents(params);
      //Check for API error
      if (res[0] === false) { return res };

      //Get api data
      const events = res[1];

      for (let index = 0; index < events.length; index++) {
        const event = events[index];

        //Build object for udating db
        let data = {
          eventName: event.event.name,
          eventTypeId: system.eventTypeId,
          countryCode: event.event.countryCode,
          timezone: event.event.timezone,
          venue: event.event.venue,
          openDate: event.event.openDate,
          marketCount: event.marketCount
        };

        //Update database
        const eventUpdate = await Event.findOneAndUpdate(
          { $and: [{ eventId: event.event.id }, { systemId: system._id }] },
          { $set: data },
          { runValidators: true, new: true, upsert: true }
        )

        if (!eventUpdate) { return [false, 'Event update failed - Sys Id:' + system._id + 'Event Id:' + event.event.id]; }

        //Update the markets for each event and insert in DB
        const marketupdate = await this.marketUpdate(eventUpdate, system);

        if (marketupdate[0] === false) { return marketupdate }
      };

      //Update system
      const systemUpdate = await System.findByIdAndUpdate(
        system._id,
        { $set: { lastEventUpdate: new Date().toJSON() } },
        { runValidators: true, new: true, upsert: true }
      )

      const finishTime = new Date().getTime();

      return [true, 'Event update success - Sys Id:' + system._id + 'Time:' + finishTime - startTime];

    } catch (e) {
      return [false, e];
    }
  };

  async marketUpdate(event, system, marketId = "") {
    try {
      let params = '';
      const APIfilter = buildFilter(system, this.config);

      if (event.eventId !== '') {
        params = '{"filter":{"eventIds":["' + event.eventId + '"], ' + APIfilter + '},"sort":"' + system["sort"] + '","maxResults":"' + system["maxResults"] + '","marketProjection":' + system["marketProjection"] + '}';
        marketId = "";
      }

      if (marketId !== '') {
        params = '{"filter":{"marketIds":["' + marketId + '"]},"sort": "' + system["sort"] + '","maxResults": "' + system["maxResults"] + '","marketProjection": ' + system["marketProjection"] + '}';
      }

      const res = await this.api.getMarkets(params);

      //Check for API error
      if (!res[0]) { return res };

      //Get api data
      const markets = res[1];

      for (let index = 0; index < markets.length; index++) {
        const market = markets[index];

        //Fix market name for horse racing place markets
        if (market.marketName == "To Be Placed") {

          markets.forEach(item => {
            if (item.description.marketTime === market.description.marketTime && item.marketName !== "To Be Placed") {
              market.marketName = item.marketName;
            }
          });
        }

        let raceNumber = '';
        let raceDistance = '';
        let raceClass = '';

        if (market.eventType.id === "7") {
          const details = market.marketName.trim().split(' ');
          raceNumber = details[0].slice(1, details[0].length);
          raceDistance = details[1].slice(0, -1);
          (details[3] !== '') ? details[2] += " " + details[3] : "";
          raceClass = details[2];
        }

        let data = {
          marketName: market.marketName,
          eventId: event.eventId,
          eventName: event.eventName,
          marketStartTime: market.marketStartTime,
          totalMatched: market.totalMatched,
          competition: market.competition,
          raceNumber: raceNumber,
          raceDistance: raceDistance,
          raceClass: raceClass,
          persistenceEnabled: market.description.persistenceEnabled,
          bspMarket: market.description.bspMarket,
          marketTime: market.description.marketTime,
          suspendTime: market.description.suspendTime,
          settleTime: market.description.settleTime,
          bettingType: market.description.bettingType,
          turnInPlayEnabled: market.description.turnInPlayEnabled,
          marketType: market.description.marketType,
          regulator: market.description.regulator,
          marketBaseRate: market.description.marketBaseRate,
          discountAllowed: market.description.discountAllowed,
          wallet: market.description.wallet,
          rules: market.description.rules,
          rulesHasDate: market.description.rulesHasDate,
          eachWayDivisor: market.description.eachWayDivisor,
          clarifications: market.description.clarifications,
          lineRangeInfo: market.description.lineRangeInfo,
          raceType: market.description.raceType,
          priceLadderDescription: market.description.priceLadderDescription.type,
        }

        const marketUpdate = await Market.findOneAndUpdate(
          { $and: [{ marketId: market.marketId }, { systemId: system._id }] },
          { $set: data },
          { runValidators: true, new: true, upsert: true }
        )

        if (!marketUpdate) { return [false, 'Market update failed - Sys Id:' + system._id + ' Market Id:' + market.marketId] };

        await Event.findOneAndUpdate(
          { _id: event._id },
          { $addToSet: { markets: marketUpdate._id } }
        );

        //Update runners
        const runnerUpdate = await this.runnerUpdate(market.runners, system, market.marketId);

        if (runnerUpdate[0] === false) { return runnerUpdate }

      }

      return [true, 'Market update success - Sys Id:' + system._id];

    } catch (e) {
      return [false, e]
    }
  }

  //Runner Update By Market - grabs the runners for the market and inserts/updates into the database.
  async runnerUpdate(runners, system, marketId) {
    try {

      for (let index = 0; index < runners.length; index++) {
        const runner = runners[index];

        let data = {
          runnerName: runner.runnerName,
          handicap: runner.handicap,
          sortPriority: runner.sortPriority,
          metadata: JSON.stringify(runner.metadata),
          form: runner.metadata.FORM,
        }

        const runnerUpdate = await Runner.findOneAndUpdate(
          { $and: [{ marketId: marketId }, { selectionId: runner.selectionId }, { systemId: system._id }] },
          { $set: data },
          { runValidators: true, new: true, upsert: true }
        )

        if (!runnerUpdate) { return [false, 'Runner update failed - Sys Id:' + system._id + ' Market Id:' + marketId + ' Selection Id:' + runner.selectionId] }

        await Market.findOneAndUpdate(
          { marketId: marketId },
          { $addToSet: { runners: runnerUpdate._id } }
        );

      }

      return [true, 'Runner update success - Sys Id:' + system._id + ' Market Id:' + marketId];

    } catch (e) {
      return [false, e]
    }
  }

  //Update market/runner book based on time before and after market start or single market
  async marketBookUpdate(systemId = '', marketId = '', markets = '') {

    if (systemId !== '' && markets === '' && marketId === '') {
      let timeIn = new Date()
      timeIn = new Date(timeIn.getTime() - (this.config.apiBookTimeIn * 1000)).toJSON();
      let timeOut = new Date()
      timeOut = new Date(timeOut.getTime() + (this.config.apiBookTimeOut * 1000)).toJSON();

      markets = await Market.find({ $and: [{ systemId: systemId }, { marketTime: { $gte: timeIn, $lte: timeOut } }] });
    } else if (markets === '' && marketId !== '') {
      markets = [{ marketId: marketId }];
    }

    for (let index = 0; index < markets.length; index++) {
      const market = markets[index];
      const params = '{"marketIds":["' + market['marketId'] + '"], "priceProjection":{"priceData":["EX_ALL_OFFERS"],"virtualise":"true"}}';
      const res = await this.api.getMarketBook(params);

      //Check for API error
      if (res[0] === false) {
        return res;
      }

      //Get api data
      const marketBook = res[1][0];

      let data = {
        isMarketDataDelayed: marketBook.isMarketDataDelayed,
        status: marketBook.status,
        betDelay: marketBook.betDelay,
        bspReconciled: marketBook.bspReconciled,
        complete: marketBook.complete,
        inplay: marketBook.inplay,
        numberOfWinners: marketBook.numberOfWinners,
        numberOfRunners: marketBook.numberOfRunners,
        numberOfActiveRunners: marketBook.numberOfActiveRunners,
        lastMatchTime: marketBook.lastMatchTime,
        totalMatched: marketBook.totalMatched,
        totalAvailable: marketBook.totalAvailable,
        crossMatching: marketBook.crossMatching,
        runnersVoidable: marketBook.runnersVoidable,
        version: marketBook.version,
      }

      const marketUpdate = await Market.updateMany(
        { marketId: marketBook.marketId },
        { $set: data },
        { runValidators: true, new: true }
      )

      //Update runnerbook as well
      if (marketBook.runners) {

        const runners = marketBook.runners;

        for (let index = 0; index < runners.length; index++) {
          const runner = runners[index];

          let data = {
            handicap: runner.handicap,
            selectionId: runner.selectionId,
            status: runner.status,
            adjustmentFactor: runner.adjustmentFactor,
            totalMatched: runner.totalMatched,
            removalDate: runner.removalDate,
            // spNearPrice: (!runner.sp.nearPrice) ? "" : runner.sp.nearPrice.toJSON,
            // spFarPrice: (!runner.sp.farPrice) ? "" : runner.sp.farPrice,
            // spBackStakeTaken: (!runner.sp.backStakeTaken) ? "" : runner.sp.backStakeTaken,
            // spLayLiabilityTaken: (!runner.sp.layLiabilityTaken) ? "" : runner.sp.layLiabilityTaken,
            // actualSP: (!runner.sp.actualSP) ? "" : runner.sp.actualSP,
            exAvailableToBack: JSON.stringify(runner.ex.availableToBack),
            exAvailableToLay: JSON.stringify(runner.ex.availableToLay),
            exTradedVolume: JSON.stringify(runner.ex.tradedVolume),
            matchesByStrategy: runner.matchesByStrategy,
          }

          const runnerUpdate = await Runner.updateMany(
            { $and: [{ marketId: marketBook.marketId }, { selectionId: runner.selectionId }] },
            { $set: data },
            { runValidators: true, new: true }
          )
        }
      }
    }

    return [true, 'Market and runner book updated'];
  }


  //Find markets to place bets on and place bets based on scenerio and staking plan. Requires user and system object as input.
  async placeBets(user, system) {
    if (!system || system === "") return [false, "No system provided"];
    if (!user || user === "") return [false, "No user provided"];

    const betsPlaced = [];
    const transactions = [];
    let wallet = 0;
    let walletType = '';

    //Select which wallet to use
    if (system['mode'] === "Live") {
      wallet = user['wallet'];
      walletType = 'Live';
    } else {
      wallet = user['virtualWallet'];
      walletType = 'Virtual';
    }

    //Do system prebet Stats Chk
    const sysStatus = systemStatsCheck(system);

    if (sysStatus[0] > 0) {

      //Stop system with message---------------------------------

      const systemUpdate = await System.findByIdAndUpdate(
        systemId,
        { $set: { isActive: false, lastStopped: new Date().toJSON(), statusDesc: sysStatus[1] } },
        { runValidators: true, new: true }
      )
      //-------------------------------------------------

      return [false, sysStatus[1]];
    }

    //Get markets in systems bet window
    let timeIn = new Date().toJSON()//From now
    let timeOut = new Date()
    //--------override for testing
    // system['timeSecsRace'] = 1800;
    //----------------------------
    timeOut = new Date(timeOut.getTime() + (system['timeSecsRace'] * 1000)).toJSON();
    const markets = await Market.find({ $and: [{ systemId: system._id }, { marketTime: { $gte: timeIn, $lte: timeOut } }] });

    if (markets.length === 0) return [true, "No markets found to bet on for system. System Id:" + system._id];

    //Loop through each market and assess if bet can be placed
    for (let index = 0; index < markets.length; index++) {
      const market = markets[index];

      //Update the market and get the market data
      const marketUpdate = await this.marketBookUpdate('', market.marketId);
      if (marketUpdate[0] === false) return [false, "Failed to update marketbooks"];

      //Check if bet already made on this market -----------------------------------------------------------------------------------------------
      const activeBets = await Result.find({ $and: [{ systemId: system._id }, { marketId: market.marketId }, { betStatus: 'Open' }] });

      if (activeBets.length === 0) {
        //-----------------------------------------------------------------------------------------------------------------------------------------

        //Do system prebet market chk pre market update
        let mktStatus = marketStatsCheck(system, market, "Pre");

        //echo $market['eventName']."-".$market['marketName'] ."-". count($activeBets).":".$mktStatus[0].":".$market['status']."<br>";

        if (activeBets.length > 0 || mktStatus[0] > 0) {
          continue;
        }

        const marketData = await Market.find({ $and: [{ systemId: system._id }, { marketId: market.marketId }] });
        if (!marketData) return [false, "Failed to get market data"];
        const runnerData = await Runner.find({ $and: [{ systemId: system._id }, { marketId: market.marketId }] });
        if (!runnerData) return [false, "Failed to get runner data"];

        //Prcoess bet
        //Do system prebet market chk post market update
        mktStatus = marketStatsCheck(system, marketData, "Post");

        if (mktStatus[0] === 0) {

          //Process bets------------------------------------------------------------------

          //Get all results since system last started for using in bet scenario
          const results = await Result.find({ $and: [{ systemId: system._id }, { datePlaced: { $gte: system['lastStarted'] } }] });

          //Place the bets
          const bets = processBets(system, marketData, runnerData, results)

          for (let index = 0; index < bets.length; index++) {
            const bet = bets[index];

            //Reference to send to Betfair when placing the bet
            bet['customerRef'] = system['userId'].toString() + "_" + market['marketId'];

            bet['orderStatus'] = "Executible";
            bet['racingBetType'] = system['racingBetType'];
            bet['betStatus'] = "Open";
            bet['commissionperc'] = marketData[0]['marketBaseRate'];

            //Set the bet liability
            if (system['betType'] === "Back") {
              bet['liability'] = bet['size'];
            } else {
              bet['liability'] = Math.round(((bet['size'] * bet['reqPrice']) / 100 - bet['size']));
            }

            //Check if setWallet and funds available
            if (wallet < bet['liability']) {
              //TO DO: ALERT NO FUNDS AVAILABLE
              return [false, 'No funds available to make bet']
            }

            //Create the bet
            let betPlaced = false;
            if (system['mode'] === "Live") {
              //Betfair API ------TO DO -----

            } else {
              //Simulated
              bet['betPlaced'] = new Date().toJSON();
              //Set id as timestamp
              bet['betId'] = new Date().getTime();
              betPlaced = true;
            }

            wallet = wallet - bet['liability'];

            transactions.push({ systemId: system._id, transactionType: "Debit", transactionDesc: "Place bet. Bet Id:" + bet['betId'], walletType: walletType, amt: -bet['liability'], balance: wallet })

            //Save in database if bet placed
            if (betPlaced) {

              let data = {
                userId: user._id,
                systemId: system['id'],
                betId: bet['betId'],
                customerRef: bet['customerRef'],
                betPlaced: bet['betPlaced'],
                eventId: marketData[0]['eventId'],
                eventName: marketData[0]['eventName'],
                marketId: marketData[0]['marketId'],
                marketName: marketData[0]['marketName'],
                selectionId: bet['selectionId'],
                selectionName: bet['selectionName'],
                orderType: bet['orderType'],
                orderStatus: bet['orderStatus'],
                betType: bet['betType'],
                racingBetType: bet['racingBetType'],
                persistence: bet['persistence'],
                betStatus: bet['betStatus'],
                reqPrice: bet['reqPrice'],
                size: bet['size'],
                liability: bet['liability'],
                commissionperc: bet['commissionperc'],
                wallet: bet['wallet'],
                betOutcome: '',
                settledDate: '',
                sizeSettled: '',
                sizeMatched: '',
                sizeRemaining: '',
                sizeLapsed: '',
                sizeVoided: '',
                sizeCancelled: '',
                priceMatched: '',
                priceReduced: false,
                matchedDate: '',
                commission: '',
                profitLoss: '',
                returned: '',
                closed: ''
              }

              const newBet = Result.create(data)
              //TO DO log if database update failed

              //Check if new event and add to events stats
              const eventBets = await Result.find({ $and: [{ systemId: system._id }, { eventId: marketData[0].eventId }] });
              eventBets.length < 1 ? system['totalEvents'] = system['totalEvents'] + 1 : "";

              system['totalBets'] = system['totalBets'] + 1;
              system['unsettledBets'] = system['unsettledBets'] + 1;
              system['totalMarkets'] = system['totalMarkets'] + 1

              //Update system Status
              data = {
                totalBets: parseInt(system['totalBets']),
                unsettledBets: parseInt(system['unsettledBets']),
                totalEvents: parseInt(system['totalEvents']),
                totalMarkets: parseInt(system['totalMarkets']),
              }

              const sysUpdate = await System.findByIdAndUpdate(
                system['_id'],
                { $set: data },
                { runValidators: true, new: true }
              )
              //TO DO log if database update failed

              //Update user status
              if (wallet !== '') {
                if (system['mode'] === "Live") {
                  user['wallet'] = wallet;
                  ((user['maxWallet'] < wallet) ? user['maxWallet'] = wallet : "");
                  ((user['minWallet'] > wallet) ? user['minWallet'] = wallet : "");

                } else {
                  user['virtualWallet'] = wallet;
                  ((user['maxVirtualWallet'] < wallet) ? user['maxVirtualWallet'] = wallet : "");
                  ((user['minVirtualWallet'] > wallet) ? user['minVirtualWallet'] = wallet : "");
                }
              }

              const userUpdate = await User.findByIdAndUpdate(
                system['userId'],
                { $set: user },
                { runValidators: true, new: true }
              )
              //TO DO log if database update failed

              betsPlaced.push(bet);

            }
          }
        }

      }
    }

    //Add bet transactions to DB
    const newTransaction = await Transaction.create(transactions);

    return [true, betsPlaced];
  }

  //Checks and updates status of active bets. Requires user and system object as input.
  async betUpdate(user, system) {
    if (!system || system === "") return [false, "No system provided"];
    if (!user || user === "") return [false, "No user provided"];

    let wallet = 0;
    let walletType = '';
    let transactions = [];

    //Get active bets for system
    const activeBets = await Result.find({ $and: [{ systemId: system._id }, { $or: [{ betOutcome: null }, { betStatus: 'Open' }] }] });
    if (activeBets.length === 0) return [true, 'No active bets for system. System Id:' + system._id];

    system['unsettledBets'] = activeBets.length;

    //Select which wallet to use
    if (system['mode'] === "Live") {
      wallet = user['wallet'];
      walletType = 'Live';
    } else {
      wallet = user['virtualWallet'];
      walletType = 'Virtual';
    }

    for (let index = 0; index < activeBets.length; index++) {
      const bet = activeBets[index];

      if (system['mode'] === 'Live') {

        //TO DO ---------------



      } else if (system['mode'] === 'Simulated') {

        //No direct bet info from API so need to do part manual market Update

        //Update the market and get the market data
        const marketUpdate = this.marketBookUpdate("", bet['marketId'], "");
        if (marketUpdate[0] === false) return marketUpdate;

        const marketData = await Market.findOne({ $and: [{ systemId: system._id }, { marketId: bet['marketId'] }] });
        if (!marketData) return [false, "Failed to get market data"];
        const runnerData = await Runner.find({ $and: [{ systemId: system._id }, { marketId: bet['marketId'] }] });
        if (!runnerData) return [false, "Failed to get runner data"];

        //Get the bet runner selection status
        let selectionStatus = '';
        runnerData.forEach(runner => {
          (runner['selectionId'] === bet['selectionId']) ? selectionStatus = runner['status'] : "";
        });

        if (marketData['status'] === "CLOSED") {
          bet['settledDate'] = new Date().toJSON();
          bet['sizeSettled'] = bet['size'];

          //Winner
          if (selectionStatus === "WINNER" || selectionStatus === "PLACED") {
            if (bet['betType'] === "Back") {
              (selectionStatus === "WINNER") ? bet['betOutcome'] = "Win" : bet['betOutcome'] = "Place";
              system['totalWinners'] = system['totalWinners'] + 1;
              bet['profitLoss'] = Math.round(bet['sizeSettled'] * bet['priceMatched'] / 100 - bet['sizeSettled']);
              bet['returned'] = Math.round(bet['sizeSettled'] * bet['priceMatched'] / 100);
              wallet = wallet + bet['returned'];
              system['totalConsecWinners'] = system['totalConsecWinners'] + 1;
              system['totalConsecLosers'] = 0;

              transactions.push({ systemId: system._id, transactionType: "Credit", transactionDesc: "Winning Bet:" + bet['betId'], walletType: walletType, amt: bet['returned'], balance: wallet });

              bet['commission'] = Math.round(bet['commissionperc'] / 100 * bet['profitLoss']);
              if (system['includeCommission']) {
                bet['profitLoss'] = bet['profitLoss'] - bet['commission'];
                wallet = wallet - bet['commission'];
                transactions.push({ systemId: system._id, transactionType: "Debit", transactionDesc: "Winning Bet Commission:" + bet['betId'], walletType: walletType, amt: -bet['commission'], balance: wallet });
              }

              system['profitLoss'] = system['profitLoss'] + bet['profitLoss']

            } else {
              bet['betOutcome'] = "Lose";
              system['totalLosers'] = system['totalLosers'] + 1;
              bet['profitLoss'] = -bet['liability'];
              system['profitLoss'] = system['profitLoss'] + bet['profitLoss']
              bet['returned'] = 0;
              system['totalConsecLosers'] = system['totalConsecLosers'] + 1;
              system['totalConsecWinners'] = 0;
              bet['commission'] = 0;
            }
          }

          //Loser
          if (selectionStatus === "LOSER") {
            if (bet['betType'] === "Back") {
              bet['betOutcome'] = "Lose";
              system['totalLosers'] = system['totalLosers'] + 1;
              bet['profitLoss'] = -bet['liability'];
              system['profitLoss'] = system['profitLoss'] + bet['profitLoss']
              bet['returned'] = 0;
              system['totalConsecLosers'] = system['totalConsecLosers'] + 1;
              system['totalConsecWinners'] = 0;
              bet['commission'] = 0;

            } else {

              bet['betOutcome'] = "Win";
              system['totalWinners'] = system['totalWinners'] + 1;
              bet['profitLoss'] = bet['sizeSettled'];
              system['profitLoss'] = system['profitLoss'] + bet['profitLoss']
              bet['returned'] = (bet['sizeSettled'] + bet['liability']);
              wallet = wallet + bet['returned'];
              system['totalConsecWinners'] = system['totalConsecWinners'] + 1;
              system['totalConsecLosers'] = 0;

              transactions.push({ systemId: system._id, transactionType: "Credit", transactionDesc: "Winning Bet:" + bet['betId'], walletType: walletType, amt: bet['returned'], balance: wallet });

              bet['commission'] = Math.round(bet['commissionperc'] / 100 * bet['profitLoss']);
              if (system['includeCommission']) {
                bet['profitLoss'] = bet['profitLoss'] - bet['commission'];
                system['profitLoss'] = system['profitLoss'] + bet['profitLoss']
                wallet = wallet - bet['commission'];
                transactions.push({ systemId: system._id, transactionType: "Debit", transactionDesc: "Winning Bet Commission:" + bet['betId'], walletType: walletType, amt: -bet['commission'], balance: wallet });
              }
            }
          }

          //Removed
          if (selectionStatus === "REMOVED" || selectionStatus === "REMOVED_VACANT") {
            bet['betOutcome'] = "Void";
            bet['returned'] = bet['liability'];
            wallet = wallet + bet['returned'];
            bet['profitLoss'] = 0;
            bet['commission'] = 0;
            transactions.push({ systemId: system._id, transactionType: "Credit", transactionDesc: "Void Bet:" + bet['betId'], walletType: walletType, amt: bet['returned'], balance: wallet });
          }

          //Close bet
          bet['closed'] = new Date().toJSON;
          bet['betStatus'] = "Closed";

          //Update unsettled bets
          system['unsettledBets'] = system['unsettledBets'] - 1;

        } else {
          //Market still Open or suspended
          //Assumes placed bet was matched - Note issue with simmulated bets that needs to be considered

          if (selectionStatus === "ACTIVE") {
            if (bet['matchedDate'] === null || bet['matchedDate'] === '') {
              bet['orderStatus'] = "Complete";
              bet['matchedDate'] = new Date().toJSON();
              bet['priceMatched'] = bet['reqPrice'];
              bet['sizeMatched'] = bet['size'];
              bet['sizeRemaining'] = 0;
              bet['sizeLapsed'] = 0;
              bet['sizeVoided'] = 0;
              bet['sizeCancelled'] = 0;
              bet['priceReduced'] = 0;

              (bet['sizeMatched'] > system['maxBet']) ? system['maxBet'] = bet['sizeMatched'] : "";

            }
          }
        }
      }

      //Update the bet

      const betUpdate = await Result.findByIdAndUpdate(
        bet['_id'],
        { $set: bet },
        { runValidators: true, new: true }
      )
      //TO DO log if database update failed

      //Update system Status

      const sysUpdate = await System.findByIdAndUpdate(
        system['id'],
        { $set: system },
        { runValidators: true, new: true }
      )
      //TO DO log if database update failed


      //Update user status
      if (wallet !== '') {
        if (system['mode'] === "Live") {
          user['wallet'] = wallet;
          ((user['maxWallet'] < wallet) ? user['maxWallet'] = wallet : "");
          ((user['minWallet'] > wallet) ? user['minWallet'] = wallet : "");

        } else {
          user['virtualWallet'] = wallet;
          ((user['maxVirtualWallet'] < wallet) ? user['maxVirtualWallet'] = wallet : "");
          ((user['minVirtualWallet'] > wallet) ? user['minVirtualWallet'] = wallet : "");
        }
      }

      const userUpdate = await User.findByIdAndUpdate(
        system['userId'],
        { $set: user },
        { runValidators: true, new: true }
      )
      //TO DO log if database update failed



    }

    //Add bet transactions to DB
    if (transactions.length > 0) {
      const newTransaction = await Transaction.create(transactions);
    }

    return [true, 'Bet Update Success'];

  }


  //Betfair API login
  async apiLogin(userId) {
    try {

      //Get the user API settings
      const apiSettings = await Apisetting.findOne({ userId: userId });
      if (!apiSettings) { return [false, "No API settings found for this user"] };

      //If API not enabled, don't proceed any further.
      if ((apiSettings.apiMode === 'Test' && !apiSettings.testApiEnabled) || (apiSettings.apiMode === 'Live' && !apiSettings.liveApiEnabled)) {
        return [false, "API disabled"];
      }

      //Login
      const res = await this.api.login(apiSettings);

      if (res[0] === true) {
        if (res[1]) {
          //Logged in and session returned

          //Save the session to the database and update API status
          let data = (apiSettings.apiMode === 'Test') ? { $set: { testSessionId: res[1], testApiStatus: true, lastTestStatus: new Date().toJSON(), lastTestLogin: new Date().toJSON(), lastTestMessage: 'Login Success' } } : { $set: { liveSessionId: res[1], liveApiStatus: true, lastLiveStatus: new Date().toJSON(), lastLiveLogin: new Date().toJSON(), lastLiveMessage: 'Login Sucess' } }
          let result = await Apisetting.findOneAndUpdate(
            { userId: userId },
            data,
            { runValidators: true, new: true }
          );
        }

        return [true, 'Success']
      } else {
        //API login error
        return res;
      }
    } catch (e) {
      return [false, e]
    }
  }

  //Update the betfair API keep alive for a user
  async apiKeepAlive(userId) {
    //Get the customer API settings
    try {

      //Get the user API settings
      const apiSettings = await Apisetting.findOne({ userId: userId });
      if (!apiSettings) { return [false, "No API settings found for this user"] };

      //If API not enabled, don't proceed any further.
      if ((apiSettings.apiMode === 'Test' && !apiSettings.testApiEnabled) || (apiSettings.apiMode === 'Live' && !apiSettings.liveApiEnabled)) {
        return [false, "API disabled"];
      }

      const res = await this.api.keepAlive(apiSettings);


      if (res[0] === true) {

        //Update API status
        let data = (apiSettings.apiMode === 'Test') ? { $set: { testApiStatus: true, lastTestKeepAlive: new Date().toJSON(), lastTestStatus: new Date().toJSON(), lastTestMessage: 'Keepalive Success' } } : { $set: { liveApiStatus: true, lastLiveKeepAlive: new Date().toJSON(), lastLiveStatus: new Date().toJSON(), lastLiveMessage: 'Keepalive Sucess' } }
        const result = await Apisetting.findOneAndUpdate(
          { userId: userId },
          data,
          { runValidators: true, new: true }
        );

        if (result) {
          return [true, "Success"];
        }

      } else {

        //Try to login
        const res = await this.apiLogin(userId);

        if (res[0] === true) {

          return [true, "Success"]

        } else {
          //Update API status
          let data = (apiSettings.apiMode === 'Test') ? { $set: { testSessionId: '', testApiStatus: false, lastTestStatus: new Date().toJSON(), lastTestMessage: 'Keepalive and attempted login failed' } } : { $set: { liveSessionId: '', liveApiStatus: false, lastLiveStatus: new Date().toJSON(), lastLiveMessage: 'Keepalive and attempted login failed' } }

          const result = await Apisetting.findOneAndUpdate(
            { userId: userId },
            data,
            { runValidators: true, new: true }
          );

          return [false, "Keepalive and attempted API login failed"];
        }
      }

    } catch (e) {
      return [false, e]
    }
  }

  async apiLogout(userId) {

    //Get the user API settings
    const apiSettings = await Apisetting.findOne({ userId: userId });
    if (!apiSettings) { return [false, "No API settings found for this user"] };

    //If API not enabled, don't proceed any further.
    if ((apiSettings.apiMode === 'Test' && apiSettings.testApiStatus !== true) || (apiSettings.apiMode === 'Live' && apiSettings.liveApiStatus !== true)) {
      return [false, "Not logged into API"];
    }


    const res = await this.api.logout(apiSettings);


    if (res[0]) {
      //Update API status
      let data = (apiSettings.apiMode === 'Test') ? { $set: { testSessionId: '', testApiStatus: false, lastTestStatus: new Date().toJSON(), lastTestLogout: new Date().toJSON(), lastTestMessage: 'Logout Sucess' } } : { $set: { liveSessionId: '', liveApiStatus: false, lastLiveStatus: new Date().toJSON(), lastLiveLogout: new Date().toJSON(), lastLiveMessage: 'Logout Sucess' } }
      const result = await Apisetting.findOneAndUpdate(
        { userId: userId },
        data,
        { runValidators: true, new: true }
      );

      return [true, "API logged out"];

    } else {

      return [false, "API logout failed:" + res[1]];
    }
  }

  async clearMarketData(seconds = 86400) {//default -24 hours

    let timeTo = new Date();
    timeTo = new Date(timeTo.getTime() - (seconds * 1000));

    await Event.deleteMany().where('createdAt').lt(timeTo.toJSON())
    await Market.deleteMany().where('createdAt').lt(timeTo.toJSON())
    await Runner.deleteMany().where('createdAt').lt(timeTo.toJSON())
  }

}

module.exports = BetfairController;