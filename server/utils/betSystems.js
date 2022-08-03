const BetfairTests = require("../classes/BetfairTests");

const bets = [];
let scenario = "";
let stakingPlan = "";

function processBets(system, marketData, runnerData, results) {

  const backPrices = [];
  const layPrices = [];

  scenario = system.scenario[0];
  stakingPlan = system.stakingPlan[0];

  //Get the runner prices
  runnerData.forEach(runner => {
    if (runner['status'] === "ACTIVE") {
      backPrices.push([runner['selectionId'], JSON.parse(runner['exAvailableToBack'])[0].price]);
      layPrices.push([runner['selectionId'], JSON.parse(runner['exAvailableToLay'])[0].price])
    }
  });
  //Sort from lowest to highest prices
  backPrices.sort(function (a, b) { return a[1] - b[1]; });
  layPrices.sort(function (a, b) { return a[1] - b[1]; });

  //Process scenario------------------------------------------------------------------
  if (scenario.scenarioId !== '') {
    switch (scenario.scenarioId) {
      //Default - back the favourite
      case 1:
        scn1_backthefav(system, marketData, runnerData, results, backPrices, layPrices);
        break;
    }
  } else {
    return false;
  }


  //Process staking plan--------------------------------------------------------------
  if (stakingPlan.stakingId !== '') {
    switch (stakingPlan.stakingId) {

      case 1:
        stk1_fixedStake(system, marketData, runnerData, results, backPrices, layPrices);

        break;
    }
  } else {
    return false;
  }


  return bets;
}


//Betting scenarios------------------------------------------------------------------------------------

//Default - back to favourite (back/lay)
function scn1_backthefav(system, marketData, runnerData, results, backPrices, layPrices) {

  const scenarioParams = JSON.parse(system.scenarioParams);

  let betId = 0;

  //Get the favorite selection and odds
  if (system['betType'] === "Back") {

    bets[betId] = {};
    bets[betId]['betType'] = "Back";
    bets[betId]['selectionId'] = backPrices[0][0];
    bets[betId]['reqPrice'] = Math.round(backPrices[0][1] * 100);
  } else {
    bets[betId] = {};
    bets[betId]['betType'] = "Lay";

    bets[betId]['selectionId'] = layPrices[0][0];
    bets[betId]['reqPrice'] = Math.round(layPrices[0][1] * 100);
  }

  //Get selection name TO DO: Can this be done better?
  runnerData.forEach(runner => {
    (runner['selectionId'] === bets[betId]['selectionId']) ? bets[betId]['selectionName'] = runner['runnerName'] : "";
  });

  return true;
}


//Staking Plans----------------------------------------------------------------------------------------

//Default- fixed stake
function stk1_fixedStake(system, marketData, runnerData, results, backPrices, layPrices) {
  //Get the staking plan parameters
  const stakingParams = JSON.parse(system.stakingParams);

  bets.forEach(bet => {

    bet['size'] = stakingParams.stake;

    bet['orderType'] = stakingParams.orderType;
    bet['persistence'] = stakingParams.persistancetype;
  });

  return true;

}

module.exports = { processBets }