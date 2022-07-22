const { Apisetting, Config, Event, EventType, Market, Result, Runner, Scenario, Staking, System, User } = require('../models');
const Betfairapi = require('./Betfairapi');

class BetfairHelper {

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
  }

  async setSession(userId) {
    try {
      //Get the API settings for the user
      const apiSettings = await Apisetting.findOne({ userId: userId });
      if (!apiSettings) { return [false, "No API settings found for this user"] };

      //If API not enabled, don't proceed any further.
      if (!apiSettings.apiEnabled) {
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

      return [true];

    } catch (e) {
      return [false, e]
    }
  }

  //Get a list of event types and store in DB
  async getEventTypes(userId) {
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
  async eventUpdate(userId = '', system = '') {
    try {
      const startTime = new Date().getTime();
      //Clear data older then eventTimeOut  - 24 hours ago by default
      await this.clearMarketData(this.config.eventTimeOut);

      //Update events by userId
      let systemList = '';
      if (userId !== '' && system === '') {

        //Get list of active systems for user
        systemList = await System.find({ $or: [{ userId: userId }, { isActive: true }] })
        if (!systemList) { return [false, "No active systems found."] };

        //Update events by system
      } else if (system !== '' && userId === '') {
        //Set systemList to system
        systemList = [system];
        //Set userId from system
        userId = system.userId;
      } else {
        return (false, "User id or system input missing");
      }

      //Loop through each system and update events and markets
      for (let index = 0; index < systemList.length; index++) {
        const system = systemList[index];

        const APIfilter = this.buildFilter(system);

        const params = '{"filter":{' + APIfilter + '}}';

        const res = await this.api.getEvents(params);
        //Check for API error
        if (!res[0]) { return res };

        //Get api data
        const events = res[1];

        for (let index = 0; index < events.length; index++) {
          const event = events[index];

          //Build object for udating db
          const data = {
            eventName: event.event.name,
            eventTypeId: system.eventTypeId,
            countryCode: event.event.countryCode,
            timezone: event.event.timezone,
            venue: event.event.venue,
            openDate: event.event.openDate,
            marketCount: event.marketCount
          };

          const sysId = system._id.toString();

          //Update database
          const eventUpdate = await Event.findOneAndUpdate(
            { $and: [{ eventId: event.event.id }, { systemId: system._id.toString() }] },
            { $set: data },
            { runValidators: true, new: true, upsert: true }
          )

          //Update the markets for each event and insert in DB
          const marketupdate = await this.marketUpdate(event, system);

        };
      };

      const finishTime = new Date().getTime();
      console.log(finishTime - startTime);
      return [true, ''];

    } catch (e) {
      return [false, e];
    }
  };

  async marketUpdate(event, system, marketId = "") {
    try {
      let params = '';
      const APIfilter = this.buildFilter(system);

      if (event.event.id !== '') {
        params = '{"filter":{"eventIds":["' + event.event.id + '"], ' + APIfilter + '},"sort":"' + system["sort"] + '","maxResults":"' + system["maxResults"] + '","marketProjection":' + system["marketProjection"] + '}';
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

        const data = {
          marketName: (!market.marketName) ? "" : market.marketName,
          eventId: (!event.event.id) ? "" : event.event.id,
          eventName: (!event.event.name) ? "" : event.event.name,
          marketStartTime: (!market.marketStartTime) ? "" : market.marketStartTime,
          totalMatched: (!market.totalMatched) ? "" : market.totalMatched,
          competition: (!market.competition) ? "" : market.competition,
          raceNumber: raceNumber,
          raceDistance: raceDistance,
          raceClass: raceClass,
          persistenceEnabled: (!market.description.persistenceEnabled) ? false : market.description.persistenceEnabled,
          bspMarket: (!market.description.bspMarket) ? false : market.description.bspMarket,
          marketTime: (!market.description.marketTime) ? "" : market.description.marketTime,
          suspendTime: (!market.description.suspendTime) ? "" : market.description.suspendTime,
          settleTime: (!market.description.settleTime) ? "" : market.description.settleTime,
          bettingType: (!market.description.bettingType) ? "" : market.description.bettingType,
          turnInPlayEnabled: (!market.description.turnInPlayEnabled) ? false : market.description.turnInPlayEnabled,
          marketType: (!market.description.marketType) ? "" : market.description.marketType,
          regulator: (!market.description.regulator) ? "" : market.description.regulator,
          marketBaseRate: (!market.description.marketBaseRate) ? "" : market.description.marketBaseRate,
          discountAllowed: (!market.description.discountAllowed) ? false : market.description.discountAllowed,
          wallet: (!market.description.wallet) ? "" : market.description.wallet,
          rules: (!market.description.rules) ? "" : market.description.rules,
          rulesHasDate: (!market.description.rulesHasDate) ? false : market.description.rulesHasDate,
          eachWayDivisor: (!market.description.eachWayDivisor) ? "" : market.description.eachWayDivisor,
          clarifications: (!market.description.clarifications) ? "" : market.description.clarifications,
          lineRangeInfo: (!market.description.lineRangeInfo) ? "" : market.description.lineRangeInfo,
          raceType: (!market.description.raceType) ? "" : market.description.raceType,
          priceLadderDescription: (!market.description.priceLadderDescription.type) ? "" : market.description.priceLadderDescription.type,

        }

        const marketUpdate = await Market.findOneAndUpdate(
          { $and: [{ marketId: market.marketId }, { systemId: system._id.toString() }] },
          { $set: data },
          { runValidators: true, new: true, upsert: true }
        )

        //Update runners
        const runnerUpdate = await this.runnerUpdate(market.runners, system, market.marketId);

      }

      return [true, ''];

    } catch (e) {
      return [false, e]
    }
  }

  //Runner Update By Market - grabs the runners for the market and inserts/updates into the database.
  async runnerUpdate(runners, system, marketId) {
    try {

      for (let index = 0; index < runners.length; index++) {
        const runner = runners[index];

        const data = {
          runnerName: (!runner.runnerName) ? "" : runner.runnerName,
          handicap: (!runner.handicap) ? "" : runner.handicap,
          sortPriority: (!runner.sortPriority) ? "" : runner.sortPriority,
          metadata: (!runner.metadata) ? "" : JSON.stringify(runner.metadata),
          form: (!runner.metadata.FORM) ? "" : runner.metadata.FORM,
        }

        const runnerUpdate = await Runner.findOneAndUpdate(
          { $and: [{ marketId: marketId }, { selectionId: runner.selectionId }, { systemId: system._id.toString() }] },
          { $set: data },
          { runValidators: true, new: true, upsert: true }
        )
      }

      return [true, ''];

    } catch (e) {
      return [false, e]
    }
  }

  //Update market/runner book based on time before and after market start or single market
  async marketBookUpdate(systemId = "", marketId = "", markets = "") {

    if (systemId !== '' && markets === '') {
      let timeIn = new Date()
      timeIn = new Date(timeIn.getTime() - (this.config.apiBookTimeIn * 1000)).toJSON();
      let timeOut = new Date()
      timeOut = new Date(timeOut.getTime() + (this.config.apiBookTimeOut * 1000)).toJSON();

      markets = await Market.find({ $and: [{ systemId: systemId }, { marketTime: { $gte: timeIn, $lte: timeOut } }] });
    } else if (systemId === '' && marketId !== '') {
      markets = [marketId];
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

      const data = {
        isMarketDataDelayed: (!marketBook.isMarketDataDelayed) ? false : marketBook.isMarketDataDelayed,
        status: (!marketBook.status) ? "" : marketBook.status,
        betDelay: (!marketBook.betDelay) ? false : marketBook.betDelay,
        bspReconciled: (!marketBook.bspReconciled) ? false : marketBook.bspReconciled,
        complete: (!marketBook.complete) ? false : marketBook.complete,
        inplay: (!marketBook.inplay) ? false : marketBook.inplay,
        numberOfWinners: (!marketBook.numberOfWinners) ? "" : marketBook.numberOfWinners,
        numberOfRunners: (!marketBook.numberOfRunners) ? "" : marketBook.numberOfRunners,
        numberOfActiveRunners: (!marketBook.numberOfActiveRunners) ? "" : marketBook.numberOfActiveRunners,
        lastMatchTime: (!marketBook.lastMatchTime) ? "" : marketBook.lastMatchTime,
        totalMatched: (!marketBook.totalMatched) ? "" : marketBook.totalMatched,
        totalAvailable: (!marketBook.totalAvailable) ? "" : marketBook.totalAvailable,
        crossMatching: (!marketBook.crossMatching) ? false : marketBook.crossMatching,
        runnersVoidable: (!market.runnersVoidable) ? false : marketBook.runnersVoidable,
        version: (!marketBook.version) ? "" : marketBook.version,
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

          const data = {
            handicap: (runner.handicap) ? "" : runner.handicap,
            selectionId: (!runner.selectionId) ? "" : runner.selectionId,
            status: (!runner.status) ? "" : runner.status,
            adjustmentFactor: (!runner.adjustmentFactor) ? "" : runner.adjustmentFactor,
            totalMatched: (!runner.totalMatched) ? "" : runner.totalMatched,
            removalDate: (!runner.removalDate) ? "" : runner.removalDate,
            // spNearPrice: (!runner.sp.nearPrice) ? "" : runner.sp.nearPrice.toJSON,
            // spFarPrice: (!runner.sp.farPrice) ? "" : runner.sp.farPrice,
            // spBackStakeTaken: (!runner.sp.backStakeTaken) ? "" : runner.sp.backStakeTaken,
            // spLayLiabilityTaken: (!runner.sp.layLiabilityTaken) ? "" : runner.sp.layLiabilityTaken,
            // actualSP: (!runner.sp.actualSP) ? "" : runner.sp.actualSP,
            exAvailableToBack: (!runner.ex.availableToBack) ? "" : JSON.stringify(runner.ex.availableToBack),
            exAvailableToLay: (!runner.ex.availableToLay) ? "" : JSON.stringify(runner.ex.availableToLay),
            exTradedVolume: (!runner.ex.tradedVolume) ? "" : JSON.stringify(runner.ex.tradedVolume),
            matchesByStrategy: (!runner.matchesByStrategy) ? "" : runner.matchesByStrategy,
          }

          const runnerUpdate = await Runner.updateMany(
            { $and: [{ marketId: marketBook.marketId }, { selectionId: runner.selectionId }] },
            { $set: data },
            { runValidators: true, new: true }
          )
        }
      }

      return [true, ''];
    }
  }


  //Betfair API login
  async apiLogin(userId) {
    try {
      //Get the user API settings
      const apiSettings = await Apisetting.findOne({ userId: userId });
      if (!apiSettings) { return [false, "No API settings found for this user"] };

      //If API not enabled, don't proceed any further.
      if (!apiSettings.apiEnabled) {
        return [false, "API disabled"];
      }

      //Login
      const res = await this.api.login(apiSettings);

      if (res[0] === true) {
        if (res[1]) {
          //Logged in and session returned

          //Save the session to the database and update API status
          const data = (apiSettings.apiMode === 'Test') ? { $set: { testSessionId: res[1], apiStatus: true } } : { $set: { liveSessionId: res[1], apiStatus: true } }
          let result = await Apisetting.findOneAndUpdate(
            { userId: userId },
            data,
            { runValidators: true, new: true }
          );
        }
      } else {
        //API login error
        return res;
      }
    } catch (e) {
      return [false, e]
    }
  }







  async clearMarketData(seconds = 86400) {//default -24 hours

    let timeTo = new Date();
    timeTo = new Date(timeTo.getTime() - (seconds * 1000));

    await Event.deleteMany().where('createdAt').lt(timeTo.toJSON())
    await Market.deleteMany().where('createdAt').lt(timeTo.toJSON())
    await Runner.deleteMany().where('createdAt').lt(timeTo.toJSON())
  }

  buildFilter(system) {

    //Object to loop through system filter options
    const filterParts = {
      competitionIds: '',
      marketIds: '',
      venues: '',
      marketBettingTypes: '',
      marketCountries: '',
      marketTypeCodes: ''
    }

    let str = '';
    let newStr = '';

    //Loop through system options and format to json for filter
    for (const key in filterParts) {
      if (Object.hasOwnProperty.call(filterParts, key)) {

        if (system[key] && system[key] !== "") {
          system[key].split(',').map((item, index, array) => {
            filterParts[key] += ('"' + item + '",')
          });
          str = filterParts[key];
          newStr = str.slice(0, -1);
          filterParts[key] = newStr;
        }
      }
    }

    //Build the filter string
    let bsp, turnInPlay, inPlay;
    system['bspOnly'] === true ? bsp = 'TRUE' : bsp = '';
    system['turnInPlayEnabled'] === true ? turnInPlay = 'TRUE' : turnInPlay = '';
    system['inPlayOnly'] === true ? inPlay = 'TRUE' : inPlay = '';

    let filter = "";
    filter += (system["textQuery"] && system["textQuery"] !== '') ? '"textQuery":"'.system["textQuery"] + '", ' : "";
    filter += (filterParts['competitionIds'] !== '') ? '"competitionIds":[' + filterParts['competitionIds'] + '], ' : "";
    filter += (filterParts['marketIds'] !== '') ? '"marketIds":[' + filterParts['marketIds'] + '], ' : "";
    filter += (filterParts['venues'] !== '') ? '"venues":[' + filterParts['venues'] + '], ' : "";
    filter += (bsp !== '') ? '"bspOnly":"' + bsp + '", ' : "";
    filter += (turnInPlay !== '') ? '"turnInPlayEnabled":"' + turnInPlay + '", ' : "";
    filter += (inPlay !== '') ? '"inPlayOnly":"' + inPlay + '", ' : "";
    filter += (filterParts['marketBettingTypes'] !== '') ? '"marketBettingTypes":[' + filterParts['marketBettingTypes'] + '], ' : "";
    filter += (system["eventTypeId"] !== '') ? '"eventTypeIds":["' + system["eventTypeId"] + '"], ' : "";
    filter += (filterParts['marketCountries'] !== '') ? '"marketCountries":[' + filterParts['marketCountries'] + '], ' : "";
    filter += (filterParts['marketTypeCodes'] !== '') ? '"marketTypeCodes":[' + filterParts['marketTypeCodes'] + '], ' : "";

    if (system["customTime"] === true && system["marketFromTime"] !== '' && system["marketToTime"] !== '') {
      filter += '"marketStartTime":{"from":"' + system["marketFromTime"] + '", "to":"' + system["marketToTime"] + '"}';
    } else {

      let timeTo = new Date()
      timeTo = new Date(timeTo.getTime() + (this.config.eventTimeOut * 1000));
      filter += '"marketStartTime":{"to":"' + timeTo.toJSON() + '"}';
    }

    if (filter.slice(filter.length - 2) === ', ') {
      filter = filter.slice(0, -2);
    }

    return filter;
  }
}

module.exports = BetfairHelper;