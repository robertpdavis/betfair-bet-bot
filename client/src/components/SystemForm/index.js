import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../App.css'
import Auth from '../../utils/auth';

const SystemForm = (props) => {

  const systemData = { ...props.systemData };

  const eventTypes = props.eventTypes;

  const formState = props.formState;

  const [key, setKey] = useState('details');

  const handleChange = async (event) => {

    props.handleFormChange(event);
  };

  const scenarioParams = JSON.parse(systemData.scenarioParams);
  const stakingParams = JSON.parse(systemData.stakingParams);

  return (
    <section className="container">
      <form>
        <Tabs
          id="systemTabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="details" title="System Details">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_title-lbl" htmlFor="sysform_title" title="Name of the betting system">System Name<span className="star">&#160;*</span></label>
                  <input className="form-control w-75" type="text" id="sysform_title" name="title" value={formState.title} defaultValue={systemData.title} size="30" required aria-required="true" onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_eventTypeId-lbl" htmlFor="sysform_eventTypeId" title="The event type the system will bet on">Event Type<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id=" sysform_eventTypeId" name="eventTypeId" value={formState.eventTypeId} defaultValue={systemData.eventTypeId} required aria-required="true" onChange={handleChange}>
                    <option value="1">Soccer</option>
                    <option value="2">Tennis</option>
                    <option value="3">Golf</option>
                    <option value="4">Cricket</option>
                    <option value="5">Rugby Union</option>
                    <option value="1477">Rugby League</option>
                    <option value="6">Boxing</option>
                    <option value="7">Horse Racing</option>
                    <option value="8">Motor Sport</option>
                    <option value="27454571">Esports</option>
                    <option value="10">Special Bets</option>
                    <option value="998917">Volleyball</option>
                    <option value="11">Cycling</option>
                    <option value="998916">Yachting</option>
                    <option value="2152880">Gaelic Games</option>
                    <option value="315220">Poker</option>
                    <option value="3988">Athletics</option>
                    <option value="6422">Snooker</option>
                    <option value="6423">American Football</option>
                    <option value="6231">Financial Bets</option>
                    <option value="7522">Baseball</option>
                    <option value="451485">Winter Sports</option>
                    <option value="7522">Basketball</option>
                    <option value="7524">Ice Hockey</option>
                    <option value="61420">Australian Rules</option>
                    <option value="468328">Handball</option>
                    <option value="3503">Darts</option>
                    <option value="26420387">Mixed Martial Arts</option>
                    <option value="4339">Greyhound Racing</option>
                    <option value="2378961">Politics</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenario-lbl" htmlFor="sysform_scenario" title="Select the betting scenario to use with this sysetm">Scenario Selection<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_scenario" name="scenarioId" value={formState.scenario} defaultValue={systemData.scenario[0].scenarioId} required aria-required="true" onChange={handleChange}>
                    <option value="1">Back The Favourite (Back/Lay)</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingPlan-lbl" htmlFor="sysform_stakingPlan" title="Select the staking plan to use with this system">Staking Plan<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_stakingPlan" name="stakingId" value={formState.stakingId} defaultValue={systemData.stakingPlan[0].stakingId} required aria-required="true" onChange={handleChange}>
                    <option value="1">Fixed Stake (Back/Lay)</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_mode-lbl" htmlFor="sysform_mode" title="Select Live or Simulated betting">Betting Mode<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" type="text" id="sysform_mode" name="mode" value={formState.mode} defaultValue={systemData.mode} required aria-required="true" onChange={handleChange}>
                    <option value="Simulated">Simulated</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_description-lbl" htmlFor="sysform_description" title="Short description of betting system">System Description<span className="star">&#160;*</span></label>
                  <textarea className="form-control w-75" name="description" id="sysform_description" cols="50" rows="4" value={formState.description} defaultValue={systemData.description} required aria-required="true" onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_includeCommission-lbl" htmlFor="sysform_includeCommission" title="Include commissions in profit/loss calculations">Include Commissions</label>
                  <input className="form-check-input ms-3" type="checkbox" name="includeCommission" id="sysform_includeCommission" checked={formState.includeCommission} defaultChecked={systemData.includeCommission} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_isRacingEvent-lbl" htmlFor="sysform_isRacingEvent" title="Racing systems require Win and Place markets by default">Is this a racing system?</label>
                  <input className="form-check-input ms-3" type="checkbox" name="isRacingEvent" id="sysform_isRacingEvent" checked={formState.isRacingEvent} defaultChecked={systemData.isRacingEvent} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="stats" title="System Stats">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_profitLoss-lbl" htmlFor="sysform_profitLoss" title="Total profit/loss of system">Profit/Loss</label>
                  <input className="form-control w-75" type="number" name="profitLoss" id="sysform_profitLoss" value={formState.profitLoss} defaultValue={(systemData.profitLoss / 100)} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxBet-lbl" htmlFor="sysform_maxBet" title="Maximum bet amount made">Max Bet Made</label>
                  <input className="form-control w-75" type="number" name="maxBet" id="sysform_maxBet" value={formState.maxBet} defaultValue={systemData.maxBet} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_unsettledBets-lbl" htmlFor="sysform_unsettledBets" title="Bets yet to be settled">Unsettled Bets</label>
                  <input className="form-control w-75" type="number" name="unsettledBets" id="sysform_unsettledBets" value={formState.unsettledBets} defaultValue={systemData.unsettledBets} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalBets-lbl" htmlFor="sysform_totalBets" title="Total bets made">Total Bets Made</label>
                  <input className="form-control w-75" type="number" name="totalBets" id="sysform_totalBets" value={formState.totalBets} defaultValue={systemData.totalBets} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalEvents-lbl" htmlFor="sysform_totalEvents" title="Total events bet on">Events Bet On</label>
                  <input className="form-control w-75" type="number" name="totalEvents" id="sysform_totalEvents" value={formState.totalEvents} defaultValue={systemData.totalEvents} readOnly onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalMarkets-lbl" htmlFor="sysform_totalMarkets" title="Total markets bet on">Markets Bet On</label>
                  <input className="form-control w-75" type="number" name="totalMarkets" id="sysform_totalMarkets" value={formState.totalMarkets} defaultValue={systemData.totalMarkets} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalWinners-lbl" htmlFor="sysform_totalWinners" title="Total bets won">Total Winners</label>
                  <input className="form-control w-75" type="number" name="totalWinners" id="sysform_totalWinners" value={formState.totalWinners} defaultValue={systemData.totalWinners} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalLosers-lbl" htmlFor="sysform_totalLosers" title="Total bets lost">Total Losers</label>
                  <input className="form-control w-75" type="number" name="totalLosers" id="sysform_totalLosers" value={formState.totalLosers} defaultValue={systemData.totalLosers} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalConsecWinners-lbl" htmlFor="sysform_totalConsecWinners" title="Total winners in a row">Consecutive Winners</label>
                  <input className="form-control w-75" type="number" name="totalConsecWinners" id="sysform_totalConsecWinners" value={formState.totalConsecWinners} defaultValue={systemData.totalConsecWinners} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalConsecLosers-lbl" htmlFor="sysform_totalConsecLosers" title="Total loses in a row">Consecutive Losers</label>
                  <input className="form-control w-75" type="number" name="totalConsecLosers" id="sysform_totalConsecLosers" value={formState.totalConsecLosers} defaultValue={systemData.totalConsecLosers} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_savestats-lbl" htmlFor="sysform_savestats" title="Save changes to system statistics">Save Statistics</label>
                  <input className="form-check-input ms-3" type="checkbox" name="savestats" id="sysform_savestats" checked={formState.savestats} defaultChecked={systemData.savestats} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="limits" title="System Limits">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stopLoss-lbl" htmlFor="sysform_stopLoss" title="System will stop if loss reaches this. 0 = off.">Loss Stop</label>
                  <input className="form-control w-75" type="number" name="stopLoss" id="sysform_stopLoss" value={formState.stopLoss} defaultValue={systemData.stopLoss} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stopProfit-lbl" htmlFor="sysform_stopProfit" title="System will stop if profit reaches this. 0 = off.">Profit Stop</label>
                  <input className="form-control w-75" type="number" name="stopProfit" id="sysform_stopProfit" value={formState.stopProfit} defaultValue={systemData.stopProfit} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxRunners-lbl" htmlFor="sysform_maxRunners" title="Bet will be placed on races with &lt;= this number of runners. 0 = off.">Max Runners</label>
                  <input className="form-control w-75" type="number" name="maxRunners" id="sysform_maxRunners" value={formState.maxRunners} defaultValue={systemData.maxRunners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minRunners-lbl" htmlFor="sysform_minRunners" title="Bet will be placed on races with &gt;= this number of runners. 0 = off.">Min Runners</label>
                  <input className="form-control w-75" type="number" name="minRunners" id="sysform_minRunners" value={formState.minRunners} defaultValue={systemData.minRunners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxWinners-lbl" htmlFor="sysform_maxWinners" title="System will stop winners reaches this. 0 = off.">Maximum Winners</label>
                  <input className="form-control w-75" type="number" name="maxWinners" id="sysform_maxWinners" value={formState.maxWinners} defaultValue={systemData.maxWinners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxLosers-lbl" htmlFor="sysform_maxLosers" title="System will stop when losers reaches this. 0 = off.">Maximum Losers</label>
                  <input className="form-control w-75" type="number" name="maxLosers" id="sysform_maxLosers" value={formState.maxLosers} defaultValue={systemData.maxLosers} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_consecLosers-lbl" htmlFor="sysform_consecLosers" title="System will stop when consecutive losers reaches this. 0 = off.">Consecutive Losers</label>
                  <input className="form-control w-75" type="number" name="consecLosers" id="sysform_consecLosers" value={formState.consecLosers} defaultValue={systemData.consecLosers} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_consecWinners-lbl" htmlFor="sysform_consecWinners" title="System will stop when consecutive winners reaches this. 0 = off.">Consecutive Winners</label>
                  <input className="form-control w-75" type="number" name="consecWinners" id="sysform_consecWinners" value={formState.consecWinners} defaultValue={systemData.consecWinners} onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxEvents-lbl" htmlFor="sysform_maxEvents" title="Maximum number of events system will bet on. 0 = off.">Max Events</label>
                  <input className="form-control w-75" type="number" name="maxEvents" id="sysform_maxEvents" value={formState.maxEvents} defaultValue={systemData.maxEvents} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxMarkets-lbl" htmlFor="sysform_maxMarkets" title="Maximum number of markets system will bet on. 0 = off.">Max Markets</label>
                  <input className="form-control w-75" type="number" name="maxMarkets" id="sysform_maxMarkets" value={formState.maxMarkets} defaultValue={systemData.maxMarkets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxBets-lbl" htmlFor="sysform_maxBets" title="System will stop when this is reached. 0 = off.">Maximum Bets</label>
                  <input className="form-control w-75" type="number" name="maxBets" id="sysform_maxBets" value={formState.maxBets} defaultValue={systemData.maxBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBets-lbl" htmlFor="sysform_minBets" title="System will continue until at least this is reached. 0 = off.">Minimum Bets</label>
                  <input className="form-control w-75" type="number" name="minBets" id="sysform_minBets" value={formState.minBets} defaultValue={systemData.minBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxBackLayRatio-lbl" htmlFor="sysform_maxBackLayRatio" title="Bet will be placed on market &lt;= this. 0 = off.">Maximum Back to Lay Ratio</label>
                  <input className="form-control w-75" type="number" name="maxBackLayRatio" id="sysform_maxBackLayRatio" value={formState.maxBackLayRatio} defaultValue={systemData.maxBackLayRatio} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxBookBackBets-lbl" htmlFor="sysform_maxBookBackBets" title="0 = off.">Maximum Book Back</label>
                  <input className="form-control w-75" type="number" name="maxBookBackBets" id="sysform_maxBookBackBets" value={formState.maxBookBackBets} defaultValue={systemData.maxBookBackBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" htmlFor="sysform_minBookLayBets" title="0 = off.">Minimum Book Lay</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.minBookLayBets} defaultValue={systemData.minBookLayBets} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="settings" title="Bet Settings">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_betType-lbl" htmlFor="sysform_betType" title="Back or Lay betting">Bet Type<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_betType" name="betType" value={formState.betType} defaultValue={systemData.betType} required aria-required="true" onChange={handleChange}>
                    <option value="Back">Back</option>
                    <option value="Lay">Lay</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_racingBetType-lbl" htmlFor="sysform_racingBetType" title="Set racing event bet type. Either WIN or PLACE.">Racing Bet Type<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_racingBetType" name="racingBetType" value={formState.racingBetType} defaultValue={systemData.racingBetType} required aria-required="true" onChange={handleChange}>
                    <option value="WIN">WIN</option>
                    <option value="PLACE">PLACE</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_timeSecsRace-lbl" htmlFor="sysform_timeSecsRace" title="Time in seconds to bet before event starts. 30-3600.">Time Out To Bet</label>
                  <input className="form-control w-75" type="number" name="timeSecsRace" id="sysform_timeSecsRace" max="3600" step="1" min="30" value={formState.timeSecsRace} defaultValue={systemData.timeSecsRace} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minOdds-lbl" htmlFor="sysform_minOdds" title="Bet will be placed on odds &gt;= this. 0 = off.">Minimum Odds</label>
                  <input className="form-control w-75" type="number" name="minOdds" id="sysform_minOdds" value={formState.minOdds} defaultValue={systemData.minOdds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxOdds-lbl" htmlFor="sysform_maxOdds" title="Bet will be placed on odds &lt;= this. 0 = off.">Maximum Odds</label>
                  <input className="form-control w-75" type="number" name="maxOdds" id="sysform_maxOdds" value={formState.maxOdds} defaultValue={systemData.maxOdds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxLiability-lbl" htmlFor="sysform_maxLiability" title="Bet will not be placed if liability exceeds this. 0 = off.">Maximum Liability</label>
                  <input className="form-control w-75" type="number" name="maxLiability" id="sysform_maxLiability" value={formState.maxLiability} defaultValue={systemData.maxLiability} onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_unsettledLimit-lbl" htmlFor="sysform_unsettledLimit" title="System will stop if total unsettled bets reaches this. 0 = off.">Unsettled Bet Limit</label>
                  <input className="form-control w-75" type="number" name="unsettledLimit" id="sysform_unsettledLimit" value={formState.unsettledLimit} defaultValue={systemData.unsettledLimit} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" htmlFor="sysform_minBookLayBets" title="0 = off.">Minimum Matched</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.minMatched} defaultValue={systemData.minMatched} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" htmlFor="sysform_minBookLayBets" title="0 = off.">Race Numbers</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.raceNumbers} defaultValue={systemData.raceNumbers} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" htmlFor="sysform_minBookLayBets" title="0 = off.">Race Disances</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.raceDistance} defaultValue={systemData.raceDistance} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" htmlFor="sysform_minBookLayBets" title="0 = off.">Race Classes</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.raceClass} defaultValue={systemData.raceClass} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_betStartingPrice-lbl" htmlFor="sysform_betStartingPrice" title="Bet on markets where BSP available">Bet On BSP</label>
                  <input className="form-check-input ms-3" type="checkbox" name="betStartingPrice" id="sysform_betStartingPrice" checked={formState.betStartingPrice} defaultChecked={systemData.betStartingPrice} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <legend>Scenario Details</legend>
                <hr></hr>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioTitle-lbl" htmlFor="scenarioTitle" title="Name of the scenario">Scenario Name</label>
                  <input className="form-control w-75" type="text" name="scenarioTitle" id="sysform_scenarioTitle" value={formState.scenarioTitle} defaultValue={systemData.scenario[0].title} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioDesc-lbl" htmlFor="scenarioDescription" title="Description of the scenario">Scenario Description</label>
                  <textarea className="form-control w-75" name="scenarioDescription" id="sysform_scenarioDesc" cols="50" rows="6" value={formState.scenarioDescription} defaultValue={systemData.scenario[0].description} readOnly onChange={handleChange} />
                </div>
                {/* Scenario params */}
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioParams_nthFavourite-lbl" htmlFor="scenarioParams-nthFavourite" title="Enter favourite. E.g 1 for 1st, 2 for 2nd etc.">Enter Favourite</label>
                  <input className="form-control w-75" type="number" name="scenarioParamsnthFavourite" id="sysform_scenarioParams_nthFavourite" value={formState.scenarioParamsnthFavourite} defaultValue={scenarioParams.nthFavourite} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioParams_numFavourite-lbl" htmlFor="scenarioParams-numFavourites" title="Enter number of favorites to bet on. Eg. 2 will bet on the 1st and 2nd favourites.">Enter Number of Favourites</label>
                  <input className="form-control w-75" type="number" name="scenarioParamsnumFavourites" id="sysform_scenarioParams_numFavourite" value={formState.scenarioParamsnumFavourites} defaultValue={scenarioParams.numFavourites} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioParams_excFavourite-lbl" htmlFor="scenarioParams-exclude" title="Enter number of favourite to skip">Enter Favourite to Exclude</label>
                  <input className="form-control w-75" type="number" name="scenarioParamsexclude" id="sysform_scenarioParams_excFavourite" value={formState.scenarioParamsexclude} defaultValue={scenarioParams.exclude} onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <legend>Staking Plan Details</legend>
                <hr></hr>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingTitle-lbl" htmlFor="sysform_stakingTitle" title="Description of the staking plan">Staking Plan Name</label>
                  <input className="form-control w-75" type="text" name="stakingTitle" id="sysform_stakingTitle" value={formState.stakingTitle} defaultValue={systemData.stakingPlan[0].title} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingDesc-lbl" htmlFor="sysform_stakingDesc" title="Description of the staking plan">Staking Plan Description</label>
                  <textarea className="form-control w-75" name="stakingDescription" id="sysform_stakingDesc" cols="50" rows="6" value={formState.stakingDescription} defaultValue={systemData.stakingPlan[0].description} readOnly onChange={handleChange} />
                </div>
                {/* Staking params */}
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_stake-lbl" htmlFor="stakingParams-stake" title="Enter the amount to place on each bet">Stake Amount<span className="star">&#160;*</span></label>
                  <input className="form-control w-75" type="number" name="stakingParamsstake" id="sysform_stakingParams_stake" value={formState.stakingParamsstake} defaultValue={(stakingParams.stake / 100).toFixed(2)} required aria-required="true" onChange={handleChange} />
                </div>

                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_recovery-lbl" htmlFor="stakingParams-recovery" title="Choose recovery option if required">Recovery Option<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_stakingParams_recovery" name="stakingParamsrecovery" value={formState.stakingParamsrecovery} defaultValue={stakingParams.recovery} required aria-required="true" onChange={handleChange}>
                    <option value="None">None</option>
                    <option value="Loss">Loss Recovery</option>
                    <option value="Profit">Profit Recovery</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_ordertype-lbl" htmlFor="stakingParams-ordertype" title="Order types are Limit Limit On Close or Market On Close">Order Type For Placed Bets<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_stakingParams_ordertype" name="stakingParamsordertypee" value={formState.stakingParamsordertype} defaultValue={stakingParams.orderType} required aria-required="true" onChange={handleChange}>
                    <option value="Limit">Limit Order</option>
                    <option value="LimitOnCLose">Lmit On Close Order</option>
                    <option value="MarketOnClose">Market On Close Order</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_persistancetype-lbl" htmlFor="stakingParams-persistance" title="Applies to Limit orders only. Determines what happens when market goes into play. Can be Lapse - Bet cancelled if not matched, Persist - Bet matched in play if possible or Market On Close - Bet set at SP price">Persistence Type<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_stakingParams_persistancetype" name="stakingParamspersistance" value={formState.stakingParamspersistance} defaultValue={stakingParams.persistance} required aria-required="true" onChange={handleChange}>
                    <option value="Lapse">Lapse</option>
                    <option value="Pesist">Persist</option>
                    <option value="MarketOnClose">Market On Close</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_timeinforce-lbl" htmlFor="stakingParams-timeinforce" title="Applies to Limit orders only. Overides Persistence. Fill or Kill only option.">Time In Force</label>
                  <select className="form-control w-75" id="sysform_stakingParams_timeinforce" name="stakingParamstimeinforce" value={formState.stakingParamstimeinforce} defaultValue={stakingParams.timeInForce} required aria-required="true" onChange={handleChange}>
                    <option value=""></option>
                    <option value="FillOrKill">Fill Or Kill</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_bettargettype-lbl" htmlFor="stakingParams-bettargettype" title="Applies to Limit orders only. Can set so stake is calcualted on achiving a specific payout or profit.">Bet Target Type</label>
                  <select className="form-control w-75" id="sysform_stakingParams_bettargettype" name="stakingParamsbettargettype" value={formState.stakingParamsbettargettype} required aria-required="true" onChange={handleChange}>
                    <option value=""></option>
                    <option value="Payout">Payout</option>
                    <option value="backersprofit">Backers Profit</option>
                  </select>
                </div>
              </div>
            </div>

          </Tab>
          <Tab eventKey="filter" title="System Filter Settings">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_textQuery-lbl" htmlFor="sysform_textQuery" title="Filter Query" data-content="Text to filter markets to bet on">Filter Query</label>
                  <input className="form-control w-75" type="text" name="textQuery" id="sysform_textQuery" value={formState.textQuery} defaultValue={systemData.textQuery} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketIds-lbl" htmlFor="sysform_marketIds" title="Market Ids" data-content="Filter markets to bet on by specific market Ids">Market Ids</label>
                  <input className="form-control w-75" type="text" name="marketIds" id="sysform_marketIds" value={formState.marketIds} defaultValue={systemData.marketIds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_venues-lbl" htmlFor="sysform_venues" title="Filter markets to bet on by venue where applicable">Venues</label>
                  <input className="form-control w-75" type="text" name="venues" id="sysform_venues" value={formState.venues} defaultValue={systemData.venues} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_turnInPlayEnabled-lbl" htmlFor="sysform_turnInPlayEnabled" title="Filter markets that are going in play">Going In Play</label>
                  <input className="form-check-input ms-3" type="checkbox" name="turnInPlayEnabled" id="sysform_turnInPlayEnabled" checked={formState.turnInPlayEnabled} defaultChecked={systemData.turnInPlayEnabled} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_inPlayOnly-lbl" htmlFor="sysform_inPlayOnly" title="Filter markets that are currently in play">In Play Only</label>
                  <input className="form-check-input ms-3" type="checkbox" name="inPlayOnly" id="sysform_inPlayOnly" checked={formState.inPlayOnly} defaultChecked={systemData.inPlayOnly} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketBettingTypes-lbl" htmlFor="sysform_marketBettingTypes" title="Filter by bet types - i.e ODDS, LINE etc.">Bet Types</label>
                  <select className="form-control w-75" id="sysform_marketBettingTypes" name="marketBettingTypes" value={formState.marketBettingTypes} defaultValue={systemData.marketBettingTypes} required aria-required="true" onChange={handleChange}>
                    <option value=""></option>
                    <option value="ODDS">Odds</option>
                    <option value="LINE">Line</option>
                    <option value="ASIAN_HANDICAP_DOUBLE_LINE">Asian Handicap Double Line</option>
                    <option value="ASIAN_HANDICAP_SINGLE_LINE">Asian Handicap Single Line</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketCountries-lbl" htmlFor="sysform_marketCountries" title="Filter by countries. Entered as AU,GB etc.">Countries</label>
                  <input className="form-control w-75" type="text" name="marketCountries" id="sysform_marketCountries" value={formState.marketCountries} defaultValue={systemData.marketCountries} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketTypeCodes-lbl" htmlFor="sysform_marketTypeCodes" title="Filter by market types. Entered as WIN,PLACE etc.">Market Type</label>
                  <input className="form-control w-75" type="text" name="marketTypeCodes" id="sysform_marketTypeCodes" value={formState.marketTypeCodes} defaultValue={systemData.marketTypeCodes} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_sort-lbl" htmlFor="sysform_sort" title="Determines how returned markets are displayed in events">Sort Order</label>
                  <select className="form-control w-75" id="sysform_sort" name="sort" value={formState.sort} defaultValue={systemData.sort} required aria-required="true" onChange={handleChange}>
                    <option value=""></option>
                    <option value="FIRST_TO_START">First To Start</option>
                    <option value="LAST_TO_START">Last To Start</option>
                    <option value="MINIMUM_TRADED">Minimum Traded</option>
                    <option value="MAXIMUM_TRADED">Maximum Traded</option>
                    <option value="MINIMUM_AVAILABLE">Minimum Available</option>
                    <option value="MAXIMUM_AVAILABLE">Maximum Available</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_competitionIds-lbl" htmlFor="sysform_competitionIds" title="Filter markets to bet on by competitions where applicable">Comppetition Ids</label>
                  <input className="form-control w-75" type="text" name="competitionIds" id="sysform_competitionIds" value={formState.competitionIds} defaultValue={systemData.competitionIds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_bspOnly-lbl" htmlFor="sysform_bspOnly" title="Filter markets where BSP is available">BSP Only Markets</label>
                  <input className="form-check-input ms-3" type="checkbox" name="bspOnly" id="sysform_bspOnly" checked={formState.bspOnly} defaultChecked={systemData.bspOnly} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_customTime-lbl" htmlFor="sysform_customTime" title="Filter on markets 'From Date/Time' to 'To Date/Time'. If omitted defult time set by system.">Use Custom Date/Time Filter</label>
                  <input className="form-check-input ms-3" type="checkbox" name="customTime" id="sysform_customTime" checked={formState.customTime} defaultChecked={systemData.customTime} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketFromTime-lbl" htmlFor="sysform_marketFromTime" title="With To Date/Time, filter on markets between dates/time. Limit 24 hours in advance.Format YYYY-MM-DD HH:MM:SS." hidden={systemData.customTime ? "" : "hidden"} >From Date/Time</label>
                  <input className="form-control w-75" type="text" name="marketFromTime" id="sysform_marketFromTime" value={formState.marketFromTime} defaultValue={systemData.marketFromTime} hidden={systemData.customTime ? "" : "hidden"} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketToTime-lbl" htmlFor="sysform_marketToTime" title="With From Date/Time, filter on markets between dates/time. Limit 24 hours in advance.Format YYYY-MM-DD HH:MM:SS" hidden={systemData.customTime ? "" : "hidden"}>To Time</label>
                  <input className="form-control w-75" type="text" name="marketToTime" id="sysform_marketToTime" value={formState.marketToTime} defaultValue={systemData.marketToTime} hidden={systemData.customTime ? "" : "hidden"} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxResults-lbl" htmlFor="sysform_maxResults" title="Number of markets to return. Max 1000. Default 1000.">Maximum Results</label>
                  <input className="form-control w-75" type="number" name="maxResults" id="sysform_maxResults" max="1000" step="1" min="0" value={formState.maxResults} defaultValue={systemData.maxResults} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketProjection-lbl" htmlFor="sysform_marketProjection" title="Data to return about market. Multiple options available.">Market Projection</label>
                  <input className="form-control w-75" type="text" name="marketProjection" id="sysform_marketProjection" value={formState.marketProjection} defaultValue={systemData.marketProjection} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </form>
    </section>
  );
};

export default SystemForm;
