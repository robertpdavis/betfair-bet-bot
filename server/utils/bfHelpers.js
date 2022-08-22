
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
    mktStatus["status"] = (marketData[0]['status'] !== "OPEN") ? true : false;
    mktStatus["maxRunners"] = (system['maxRunners'] !== 0) ? (marketData[0]['numberOfActiveRunners'] > system['maxRunners']) ? true : false : false;
    mktStatus["minRunners"] = (system['minRunners'] !== 0) ? (marketData[0]['numberOfActiveRunners'] < system['minRunners']) ? true : false : false;
    mktStatus["minMatched"] = (system['minMatched'] !== 0) ? (marketData[0]['totalMatched'] < system['minMatched']) ? true : false : false;
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

module.exports = { buildFilter, systemStatsCheck, marketStatsCheck }