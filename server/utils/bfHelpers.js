
//Function to create event/market filter to find markets to bet on
function buildFilter(system, config) {

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
    timeTo = new Date(timeTo.getTime() + (config.eventTimeOut * 1000));
    filter += '"marketStartTime":{"to":"' + timeTo.toJSON() + '"}';
  }

  if (filter.slice(filter.length - 2) === ', ') {
    filter = filter.slice(0, -2);
  }

  return filter;
}

//Check if system limits have been reached before betting
function systemStatsCheck(system) {
  const sysStatus = {};
  let chkStatus = 0;
  let msg = "Status stop due to:";

  //Checks stats against limits
  sysStatus["stopLoss"] = (system['stopLoss'] !== 0) ? (-system['profitLoss'] >= system['stopLoss']) ? true : false : false;
  sysStatus["stopProfit"] = (system['stopProfit'] !== 0) ? (system['profitLoss'] >= system['stopProfit']) ? true : false : false;
  sysStatus["maxEvents"] = (system['maxEvents'] !== 0) ? (system['totalEvents'] >= system['maxEvents']) ? true : false : false;
  sysStatus["maxMarkets"] = (system['maxMarkets'] !== 0) ? (system['totalMarkets'] >= system['maxMarkets']) ? true : false : false;
  sysStatus["maxWinners"] = (system['maxWinners'] !== 0) ? (system['totalWinners'] >= system['maxWinners']) ? true : false : false;
  sysStatus["maxLosers"] = (system['maxLosers'] !== 0) ? (system['totalLosers'] >= system['maxLosers']) ? true : false : false;
  sysStatus["consecWinners"] = (system['consecWinners'] !== 0) ? (system['totalConsecWinners'] >= system['consecWinners']) ? true : false : false;
  sysStatus["consecLosers"] = (system['consecLosers'] !== 0) ? (system['totalConsecLosers'] >= system['consecLosers']) ? true : false : false;

  for (const key in sysStatus) {
    if (Object.hasOwnProperty.call(sysStatus, key)) {
      const status = sysStatus[key];
      //If a system limit is reached, create msg and update chkStatus count
      if (status === true) {
        chkStatus++;
        msg += key + ", ";
      }
    }
  }
  //Return array containing the number of limits reached and msg about them.
  return [chkStatus, msg];
}

//Check if system market limits have been reached
function marketStatsCheck(system, marketData, type = "Post") {
  const mktStatus = [];
  let chkStatus = 0;
  let msg = "";

  if (type === "Pre") {
    //Checks stats against limits/settings pre market update
    if (marketData['status'] && marketData['status'] !== null) {
      mktStatus["status"] = (marketData['status'] !== "OPEN") ? true : false;
    }

    //TO DO: Add in race numbers,distances, class filters

  } else if (type == "Post") {
    //Checks stats against limits/settings post market update
    mktStatus["status"] = (marketData['status'] !== "OPEN") ? true : false;
    mktStatus["maxRunners"] = (system['maxRunners'] !== 0) ? (marketData['numberOfActiveRunners'] > system['maxRunners']) ? true : false : false;
    mktStatus["minRunners"] = (system['minRunners'] !== 0) ? (marketData['numberOfActiveRunners'] < system['minRunners']) ? true : false : false;
    mktStatus["minMatched"] = (system['minMatched'] !== 0) ? (marketData['totalMatched'] < system['minMatched']) ? true : false : false;
  }

  for (const key in mktStatus) {
    if (Object.hasOwnProperty.call(mktStatus, key)) {
      const status = mktStatus[key];
      //If a system limit is reached, create msg and update chkStatus count
      if (status === true) {
        chkStatus++;
        msg += key + ", ";
      }
    }
  }
  //Return array containing the number of limits reached and msg about them.
  return [chkStatus, msg];
}

function getDefaultSystem() {
  return {
    isActive: false,
    title: 'Enter name for system',
    description: 'Enter a description for the system',
    isRacingEvent: true,
    scenario: "62eb347990124e7362af7ff6",
    stakingPlan: "62eb347990124e7362af7ff8",
    betType: 'Back',
    racingBetType: 'WIN',
    matchInPlay: false,
    maxEvents: 0,
    maxMarkets: 0,
    minOdds: 0,
    maxOdds: 0,
    maxRunners: 0,
    minRunners: 0,
    maxBackLayRatio: 0,
    maxLiability: 0,
    maxBets: 0,
    minBets: 0,
    minMatched: 0,
    maxBookBackBets: 0,
    minBookLayBets: 0,
    minPlaceWinners: 0,
    maxPlaceWinners: 0,
    stopLoss: 0,
    stopProfit: 0,
    maxLosers: 0,
    maxWinners: 0,
    consecLosers: 0,
    consecWinners: 0,
    unsettledLimit: 0,
    timeSecsRace: 30,
    nthFavourite: 0,
    numFavourites: 0,
    exclFavourite: 0,
    totalEvents: 0,
    totalMarkets: 0,
    totalBets: 0,
    profitLoss: 0,
    totalLosers: 0,
    totalWinners: 0,
    totalConsecLosers: 0,
    totalConsecWinners: 0,
    unsettledBets: 0,
    maxBet: 0,
    eventTypeId: '7',
    marketBettingTypes: 'ODDS',
    marketCountries: 'AU',
    marketTypeCodes: 'WIN',
    sort: 'FIRST_TO_START',
    maxResults: 1000,
    marketProjection: '["EVENT","EVENT_TYPE","MARKET_START_TIME","MARKET_DESCRIPTION","RUNNER_METADATA"]',
    ordering: 2,
    __v: 0,
    scenarioParams: '[{"label":"Enter Favourite","type":"number","name":"nthFavourite","default":"","value":"","options":{},"desc":"Enter favourite. E.g 1 for 1st, 2 for 2nd etc."},{"label":"Enter Number of Favourites","type":"number","name":"numFavourites","default":"","value":"","options":{"required":false},"desc":"Enter number of favorites to bet on. Eg. 2 will bet on the 1st and 2nd favourites."},{"label":"Enter Favourite to Exclude","type":"number","name":"exclude","default":"","value":"","options":{"required":false},"desc":"Enter which favourite to skip."}]',
    stakingParams: '[{"label":"Stake Amount","type":"currency","name":"stakeAmount","default":250,"value":250,"required":true,"attr":{},"desc":"Enter the base stake amount to place on each bet"},{"label":"Recovery Option","type":"select","name":"recoveryOption","options":[{"value":"none","text":"None"},{"value":"lossRecover","text":"Loss Recovery"},{"value":"profitRecover","text":"Profit Recovery"}],"default":"none","value":"none","required":true,"attr":{},"desc":"Choose recovery option if required"},{"label":"Order Type For Placed Bets","type":"select","name":"orderType","options":[{"value":"limit","text":"Limit Order"},{"value":"limitClose","text":"Limit On Close Order"},{"value":"marketClose","text":"Market On Close Order"}],"default":"limit","value":"limit","required":true,"attr":{},"desc":"Order types are Limit, Limit On Close or Market On Close"},{"label":"Persistence Type","type":"select","name":"persistanceType","options":[{"value":"lapse","text":"Lapse"},{"value":"persist","text":"Persist"},{"value":"marketOnClose","text":"Market On Close"}],"default":"lapse","value":"lapse","required":true,"attr":{},"desc":"Applies to Limit orders only. Determines what happens when market goes into play. Can be Lapse - Bet cancelled if not matched, Persist - Bet matched in play if possible or Market On Close - Bet set at SP price."},{"label":"Time In Force","type":"select","name":"timeInForce","options":[{"value":"","text":""},{"value":"fillOrKill","text":"Fill Or Kill"}],"default":"","value":"","required":true,"attr":{},"desc":"Applies to Limit orders only. Overides Persistence. Fill or Kill only option."},{"label":"Bet Target Type","type":"select","name":"betTargetType","options":[{"value":"","text":""},{"value":"payout","text":"Payout"},{"value":"bakersProfit","text":"Bakers Profit"}],"default":"","value":"","required":true,"attr":{},"desc":"Applies to Limit orders only. Can set so stake is calcualted on achiving a specific payout or profit."}]',
    lastStarted: '',
    statusDesc: 'System created.',
    mode: 'Simulated',
    lastStopped: '',
    isArchived: false,
    lastEventUpdate: '',
    apiMode: 'test',
    betStartingPrice: false,
    bspOnly: false,
    customTime: false,
    inPlayOnly: false,
    includeCommission: false,
    turnInPlayEnabled: false
  }
}

module.exports = { buildFilter, systemStatsCheck, marketStatsCheck, getDefaultSystem }