import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import '../../App.css'
import Auth from '../../utils/auth';

const Header = (props) => {

  const system = props.system;
  const eventTypes = props.eventTypes;

  const [formState, setFormState] = useState(system);
  const [key, setKey] = useState('details');

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // const { data } = await loginUser({
      //   variables: { ...formState },
      // });

    } catch (e) {
      console.error(e);
    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(formState)
  return (
    <section className="container">
      <form onSubmit={handleFormSubmit}>
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
                  <label className="form-label" id="sysform_title-lbl" hmtlfor="sysform_title" title="Name of the betting system">System Name<span className="star">&#160;*</span></label>
                  <input className="form-control w-75" type="text" id="sysform_title" name="title" value={formState.title} size="30" required aria-required="true" onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_eventTypeId-lbl" hmtlfor="sysform_eventTypeId" title="The event type the system will bet on">Event Type<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id=" sysform_eventTypeId" name="eventType" value={formState.eventType} required aria-required="true" onChange={handleChange}>
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
                  <label className="form-label" id="sysform_scenario-lbl" hmtlfor="sysform_scenario" title="Select the betting scenario to use with this sysetm">Scenario Selection<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_scenario" name="scenario" value={formState.scenario} required aria-required="true" onChange={handleChange}>
                    <option value="1">Back The Favourite (Back/Lay)</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingPlan-lbl" hmtlfor="sysform_stakingPlan" title="Select the staking plan to use with this system">Staking Plan<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_stakingPlan" name="stakingPlan" value={formState.stakingPlan} required aria-required="true" onChange={handleChange}>
                    <option value="1">Fixed Stake (Back/Lay)</option>
                    <option value="2">% Of Bank (Back/Lay)</option>
                    <option value="3">Profit Target (Back/Lay)</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_mode-lbl" hmtlfor="sysform_mode" title="Select Live or Simulated betting">Betting Mode<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" type="text" id="sysform_mode" name="mode" value={formState.mode} required aria-required="true" onChange={handleChange}>
                    <option value="Simulated">Simulated</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_description-lbl" hmtlfor="sysform_description" title="Short description of betting system">System Description<span className="star">&#160;*</span></label>
                  <textarea className="form-control w-75" name="description" id="sysform_description" cols="50" rows="4" value={formState.description} required aria-required="true" onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_includeCommission-lbl" hmtlfor="sysform_includeCommission" title="Include commissions in profit/loss calculations">Include Commissions</label>
                  <input className="form-check-input ms-3" type="checkbox" name="includeCommission" id="sysform_includeCommission" value={formState.includeCommission} defaultChecked={formState.includeCommission} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_isRacingEvent-lbl" hmtlfor="sysform_isRacingEvent" title="Racing systems require Win and Place markets by default">Is this a racing system?</label>
                  <input className="form-check-input ms-3" type="checkbox" name="isRacingEvent" id="sysform_isRacingEvent" value={formState.isRacingEvent} defaultChecked={formState.isRacingEvent} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="stats" title="System Stats">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_profitLoss-lbl" hmtlfor="sysform_profitLoss" title="Total profit/loss of system">Profit/Loss</label>
                  <input className="form-control w-75" type="number" name="profitLoss" id="sysform_profitLoss" value={(formState.profitLoss / 100)} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxBet-lbl" hmtlfor="sysform_maxBet" title="Maximum bet amount made">Max Bet Made</label>
                  <input className="form-control w-75" type="number" name="maxBet" id="sysform_maxBet" value={formState.maxBet} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_unsettledBets-lbl" hmtlfor="sysform_unsettledBets" title="Bets yet to be settled">Unsettled Bets</label>
                  <input className="form-control w-75" type="number" name="unsettledBets" id="sysform_unsettledBets" value={formState.unsettledBets} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalBets-lbl" hmtlfor="sysform_totalBets" title="Total bets made">Total Bets Made</label>
                  <input className="form-control w-75" type="number" name="totalBets" id="sysform_totalBets" value={formState.totalBets} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalEvents-lbl" hmtlfor="sysform_totalEvents" title="Total events bet on">Events Bet On</label>
                  <input className="form-control w-75" type="number" name="totalEvents" id="sysform_totalEvents" value={formState.totalEvents} readOnly onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalMarkets-lbl" hmtlfor="sysform_totalMarkets" title="Total markets bet on">Markets Bet On</label>
                  <input className="form-control w-75" type="number" name="totalMarkets" id="sysform_totalMarkets" value={formState.totalMarkets} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalWinners-lbl" hmtlfor="sysform_totalWinners" title="Total bets won">Total Winners</label>
                  <input className="form-control w-75" type="number" name="totalWinners" id="sysform_totalWinners" value={formState.totalWinners} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalLosers-lbl" hmtlfor="sysform_totalLosers" title="Total bets lost">Total Losers</label>
                  <input className="form-control w-75" type="number" name="totalLosers" id="sysform_totalLosers" value={formState.totalLosers} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalConsecWinners-lbl" hmtlfor="sysform_totalConsecWinners" title="Total winners in a row">Consecutive Winners</label>
                  <input className="form-control w-75" type="number" name="totalConsecWinners" id="sysform_totalConsecWinners" value={formState.totalConsecWinners} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_totalConsecLosers-lbl" hmtlfor="sysform_totalConsecLosers" title="Total loses in a row">Consecutive Losers</label>
                  <input className="form-control w-75" type="number" name="totalConsecLosers" id="sysform_totalConsecLosers" value={formState.totalConsecLosers} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_savestats-lbl" hmtlfor="sysform_savestats" title="Save changes to system statistics">Save Statistics</label>
                  <input className="form-check-input ms-3" type="checkbox" name="savestats" id="sysform_savestats" value={formState.savestats} defaultChecked={formState.savestats} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="limits" title="System Limits">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stopLoss-lbl" hmtlfor="sysform_stopLoss" title="System will stop if loss reaches this. 0 = off.">Loss Stop</label>
                  <input className="form-control w-75" type="number" name="stopLoss" id="sysform_stopLoss" value={formState.stopLoss} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stopProfit-lbl" hmtlfor="sysform_stopProfit" title="System will stop if profit reaches this. 0 = off.">Profit Stop</label>
                  <input className="form-control w-75" type="number" name="stopProfit" id="sysform_stopProfit" value={formState.stopProfit} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxRunners-lbl" hmtlfor="sysform_maxRunners" title="Bet will be placed on races with &lt;= this number of runners. 0 = off.">Max Runners</label>
                  <input className="form-control w-75" type="number" name="maxRunners" id="sysform_maxRunners" value={formState.maxRunners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minRunners-lbl" hmtlfor="sysform_minRunners" title="Bet will be placed on races with &gt;= this number of runners. 0 = off.">Min Runners</label>
                  <input className="form-control w-75" type="number" name="minRunners" id="sysform_minRunners" value={formState.minRunners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxWinners-lbl" hmtlfor="sysform_maxWinners" title="System will stop winners reaches this. 0 = off.">Maximum Winners</label>
                  <input className="form-control w-75" type="number" name="maxWinners" id="sysform_maxWinners" value={formState.maxWinners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxLosers-lbl" hmtlfor="sysform_maxLosers" title="System will stop when losers reaches this. 0 = off.">Maximum Losers</label>
                  <input className="form-control w-75" type="number" name="maxLosers" id="sysform_maxLosers" value={formState.maxLosers} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_consecLosers-lbl" hmtlfor="sysform_consecLosers" title="System will stop when consecutive losers reaches this. 0 = off.">Consecutive Losers</label>
                  <input className="form-control w-75" type="number" name="consecLosers" id="sysform_consecLosers" value={formState.consecLosers} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_consecWinners-lbl" hmtlfor="sysform_consecWinners" title="System will stop when consecutive winners reaches this. 0 = off.">Consecutive Winners</label>
                  <input className="form-control w-75" type="number" name="consecWinners" id="sysform_consecWinners" value={formState.consecWinners} onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxEvents-lbl" hmtlfor="sysform_maxEvents" title="Maximum number of events system will bet on. 0 = off.">Max Events</label>
                  <input className="form-control w-75" type="number" name="maxEvents" id="sysform_maxEvents" value={formState.maxEvents} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxMarkets-lbl" hmtlfor="sysform_maxMarkets" title="Maximum number of markets system will bet on. 0 = off.">Max Markets</label>
                  <input className="form-control w-75" type="number" name="maxMarkets" id="sysform_maxMarkets" value={formState.maxMarkets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxBets-lbl" hmtlfor="sysform_maxBets" title="System will stop when this is reached. 0 = off.">Maximum Bets</label>
                  <input className="form-control w-75" type="number" name="maxBets" id="sysform_maxBets" value={formState.maxBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBets-lbl" hmtlfor="sysform_minBets" title="System will continue until at least this is reached. 0 = off.">Minimum Bets</label>
                  <input className="form-control w-75" type="number" name="minBets" id="sysform_minBets" value={formState.minBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxBackLayRatio-lbl" hmtlfor="sysform_maxBackLayRatio" title="Bet will be placed on market &lt;= this. 0 = off.">Maximum Back to Lay Ratio</label>
                  <input className="form-control w-75" type="number" name="maxBackLayRatio" id="sysform_maxBackLayRatio" value={formState.maxBackLayRatio} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxBookBackBets-lbl" hmtlfor="sysform_maxBookBackBets" title="0 = off.">Maximum Book Back</label>
                  <input className="form-control w-75" type="number" name="maxBookBackBets" id="sysform_maxBookBackBets" value={formState.maxBookBackBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" hmtlfor="sysform_minBookLayBets" title="0 = off.">Minimum Book Lay</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.minBookLayBets} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="settings" title="Bet Settings">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_betType-lbl" hmtlfor="sysform_betType" title="Back or Lay betting">Bet Type<span class="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_betType" name="betType" value={formState.betType} required aria-required="true" onChange={handleChange}>
                    <option value="Back" selected="selected">Back</option>
                    <option value="Lay">Lay</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_racingBetType-lbl" htmlfor="sysform_racingBetType" title="Set racing event bet type. Either WIN or PLACE.">Racing Bet Type<span class="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_racingBetType" name="racingBetType" value={formState.racingBetType} required aria-required="true" onChange={handleChange}>
                    <option value="WIN" selected="selected">WIN</option>
                    <option value="PLACE">PLACE</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_timeSecsRace-lbl" htmlfor="sysform_timeSecsRace" title="Time in seconds to bet before event starts. 30-3600.">Time Out To Bet</label>
                  <input className="form-control w-75" type="number" name="timeSecsRace" id="sysform_timeSecsRace" defaultValue="30" max="3600" step="1" min="30" value={formState.timeSecsRace} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minOdds-lbl" htmlfor="sysform_minOdds" title="Bet will be placed on odds &gt;= this. 0 = off.">Minimum Odds</label>
                  <input className="form-control w-75" type="number" name="minOdds" id="sysform_minOdds" defaultValue="0.00" value={formState.minOdds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxOdds-lbl" htmlfor="sysform_maxOdds" title="Bet will be placed on odds &lt;= this. 0 = off.">Maximum Odds</label>
                  <input className="form-control w-75" type="number" name="maxOdds" id="sysform_maxOdds" defaultValue="0.00" value={formState.maxOdds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxLiability-lbl" htmlfor="sysform_maxLiability" title="Bet will not be placed if liability exceeds this. 0 = off.">Maximum Liability</label>
                  <input className="form-control w-75" type="number" name="maxLiability" id="sysform_maxLiability" defaultValue="0.00" value={formState.maxLiability} onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_unsettledLimit-lbl" htmlfor="sysform_unsettledLimit" title="System will stop if total unsettled bets reaches this. 0 = off.">Unsettled Bet Limit</label>
                  <input className="form-control w-75" type="number" name="unsettledLimit" id="sysform_unsettledLimit" defaultValue="0" value={formState.unsettledLimit} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" hmtlfor="sysform_minBookLayBets" title="0 = off.">Minimum Book Lay</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.minBookLayBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" hmtlfor="sysform_minBookLayBets" title="0 = off.">Minimum Book Lay</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.minBookLayBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" hmtlfor="sysform_minBookLayBets" title="0 = off.">Minimum Book Lay</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.minBookLayBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_minBookLayBets-lbl" hmtlfor="sysform_minBookLayBets" title="0 = off.">Minimum Book Lay</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="sysform_minBookLayBets" value={formState.minBookLayBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_betStartingPrice-lbl" htmlfor="sysform_betStartingPrice" title="Bet on markets where BSP available">Bet On BSP</label>
                  <input className="form-check-input ms-3" type="checkbox" name="betStartingPrice" id="sysform_betStartingPrice" value={formState.betStartingPrice} defaultChecked={formState.betStartingPrice} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <legend>Scenario Details</legend>
                <hr></hr>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioTitle-lbl" htmlfor="sysform_scenarioTitle" title="Name of the scenario">Scenario Name</label>
                  <input className="form-control w-75" type="text" name="scenarioTitle" id="sysform_scenarioTitle" value={formState.scenarioTitle} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioDesc-lbl" htmlfor="sysform_scenarioDesc" title="Description of the scenario">Scenario Description</label>
                  <textarea className="form-control w-75" name="scenarioDesc" id="sysform_scenarioDesc" cols="50" rows="6" value={formState.scenarioDesc} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioParams_nthFavourite-lbl" htmlfor="sysform_scenarioParams_nthFavourite" title="Enter favourite. E.g 1 for 1st, 2 for 2nd etc.">Enter Favourite</label>
                  <input className="form-control w-75" type="number" name="scenarioParams.nthFavourite" id="sysform_scenarioParams_nthFavourite" value={formState.scenarioParams.nthFavourite} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioParams_numFavourite-lbl" htmlfor="sysform_scenarioParams_numFavourite" title="Enter number of favorites to bet on. Eg. 2 will bet on the 1st and 2nd favourites.">Enter Number of Favourites</label>
                  <input className="form-control w-75" type="number" name="scenarioParams.numFavourite" id="sysform_scenarioParams_numFavourite" value={formState.scenarioParams.numFavourite} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_scenarioParams_excFavourite-lbl" htmlfor="sysform_scenarioParams_excFavourite" title="Enter number of favourite to skip">Enter Favourite to Exclude</label>
                  <input className="form-control w-75" type="number" name="scenarioParams.excFavourite" id="sysform_scenarioParams_excFavourite" value={formState.scenarioParams.excFavourite} onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <legend>Staking Plan Details</legend>
                <hr></hr>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingTitle-lbl" htmlfor="sysform_stakingTitle" title="Description of the staking plan">Staking Plan Name</label>
                  <input className="form-control w-75" type="text" name="stakingTitle" id="sysform_stakingTitle" value={formState.stakingTitle} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingDesc-lbl" htmlfor="sysform_stakingDesc" title="Description of the staking plan">Staking Plan Description</label>
                  <textarea className="form-control w-75" name="stakingDesc" id="sysform_stakingDesc" cols="50" rows="6" value={formState.stakingDesc} readOnly onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_stake-lbl" htmlfor="sysform_stakingParams_stake" title="Enter the amount to place on each bet">Stake Amount<span class="star">&#160;*</span></label>
                  <input className="form-control w-75" type="number" name="stakingParams.stake" id="sysform_stakingParams_stake" value={formState.stakingParams.stake} required aria-required="true" onChange={handleChange} />
                </div>

                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_recovery-lbl" htmlfor="sysform_stakingParams_recovery" title="Choose recovery option if required">Recovery Option<span class="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_stakingParams_recovery" name="stakingParams.recovery" value={formState.stakingParams.recovery} required aria-required="true" onChange={handleChange}>
                    <option value="None" selected="selected">None</option>
                    <option value="Loss">Loss Recovery</option>
                    <option value="Profit">Profit Recovery</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_ordertype-lbl" htmlfor="sysform_stakingParams_ordertype" title="Order types are Limit Limit On Close or Market On Close">Order Type For Placed Bets<span class="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_stakingParams_ordertype" name="stakingParams.ordertype" value={formState.stakingParams.ordertype} required aria-required="true" onChange={handleChange}>
                    <option value="Limit" selected="selected">Limit Order</option>
                    <option value="LimitOnCLose">Lmit On Close Order</option>
                    <option value="MarketOnClose">Market On Close Order</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_persistancetype-lbl" htmlfor="sysform_stakingParams_persistancetype" title="Applies to Limit orders only. Determines what happens when market goes into play. Can be Lapse - Bet cancelled if not matched, Persist - Bet matched in play if possible or Market On Close - Bet set at SP price">Persistence Type<span class="star">&#160;*</span></label>
                  <select className="form-control w-75" id="sysform_stakingParams_persistancetype" name="sysform[stakingParams][persistancetype]" value={formState.racingBetType} required aria-required="true" onChange={handleChange}>
                    <option value="Lapse" selected="selected">Lapse</option>
                    <option value="Pesist">Persist</option>
                    <option value="MarketOnClose">Market On Close</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_timeinforce-lbl" htmlfor="sysform_stakingParams_timeinforce" title="Applies to Limit orders only. Overides Persistence. Fill or Kill only option.">Time In Force</label>
                  <select className="form-control w-75" id="sysform_stakingParams_timeinforce" name="sysform[stakingParams][timeinforce]" value={formState.racingBetType} required aria-required="true" onChange={handleChange}>
                    <option value="" selected="selected"></option>
                    <option value="FillOrKill">Fill Or Kill</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_stakingParams_bettargettype-lbl" htmlfor="sysform_stakingParams_bettargettype" title="Applies to Limit orders only. Can set so stake is calcualted on achiving a specific payout or profit.">Bet Target Type</label>
                  <select className="form-control w-75" id="sysform_stakingParams_bettargettype" name="sysform[stakingParams][bettargettype]" value={formState.racingBetType} required aria-required="true" onChange={handleChange}>
                    <option value="" selected="selected"></option>
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
                  <label className="form-label" id="sysform_textQuery-lbl" htmlfor="sysform_textQuery" title="Filter Query" data-content="Text to filter markets to bet on">Filter Query</label>
                  <input className="form-control w-75" type="text" name="textQuery" id="sysform_textQuery" value={formState.textQuery} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketIds-lbl" htmlfor="sysform_marketIds" title="Market Ids" data-content="Filter markets to bet on by specific market Ids">Market Ids</label>
                  <input className="form-control w-75" type="text" name="marketIds" id="sysform_marketIds" value={formState.marketIds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_venues-lbl" htmlfor="sysform_venues" title="Filter markets to bet on by venue where applicable">Venues</label>
                  <input className="form-control w-75" type="text" name="venues" id="sysform_venues" value={formState.venues} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_turnInPlayEnabled-lbl" htmlfor="sysform_turnInPlayEnabled" title="Filter markets that are going in play">Going In Play</label>
                  <input className="form-check-input ms-3" type="checkbox" name="turnInPlayEnabled" id="sysform_turnInPlayEnabled" value={formState.turnInPlayEnabled} defaultChecked={formState.betStartingPrice} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_inPlayOnly-lbl" htmlfor="sysform_inPlayOnly" title="Filter markets that are currently in play">In Play Only</label>
                  <input className="form-check-input ms-3" type="checkbox" name="inPlayOnly" id="sysform_inPlayOnly" value={formState.inPlayOnly} defaultChecked={formState.betStartingPrice} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketBettingTypes-lbl" htmlfor="sysform_marketBettingTypes" title="Filter by bet types - i.e ODDS, LINE etc.">Bet Types</label>
                  <select className="form-control w-75" id="sysform_marketBettingTypes" name="marketBettingTypes" value={formState.marketBettingTypes} defaultValue='ODDS' required aria-required="true" onChange={handleChange}>
                    <option value=""></option>
                    <option value="ODDS">Odds</option>
                    <option value="LINE">Line</option>
                    <option value="ASIAN_HANDICAP_DOUBLE_LINE">Asian Handicap Double Line</option>
                    <option value="ASIAN_HANDICAP_SINGLE_LINE">Asian Handicap Single Line</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketCountries-lbl" htmlfor="sysform_marketCountries" title="Filter by countries. Entered as AU,GB etc.">Countries</label>
                  <input className="form-control w-75" type="text" name="marketCountries" id="sysform_marketCountries" value={formState.marketCountries} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketTypeCodes-lbl" htmlfor="sysform_marketTypeCodes" title="Filter by market types. Entered as WIN,PLACE etc.">Market Type</label>
                  <input className="form-control w-75" type="text" name="marketTypeCodes" id="sysform_marketTypeCodes" value={formState.marketTypeCodes} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_sort-lbl" htmlfor="sysform_sort" title="Determines how returned markets are displayed in events">Sort Order</label>
                  <select className="form-control w-75" id="sysform_sort" name="sort" value={formState.sort} defaultValue='FIRST_TO_START' required aria-required="true" onChange={handleChange}>
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
                  <label className="form-label" id="sysform_competitionIds-lbl" htmlfor="sysform_competitionIds" title="Filter markets to bet on by competitions where applicable">Comppetition Ids</label>
                  <input className="form-control w-75" type="text" name="competitionIds" id="sysform_competitionIds" value={formState.competitionIds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_bspOnly-lbl" htmlfor="sysform_bspOnly" title="Filter markets where BSP is available">BSP Only Markets</label>
                  <input className="form-check-input ms-3" type="checkbox" name="bspOnly" id="sysform_bspOnly" value={formState.bspOnly} defaultChecked={formState.bspOnly} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_customTime-lbl" htmlfor="sysform_customTime" title="Filter on markets 'From Date/Time' to 'To Date/Time'. If omitted defult time set by system.">Use Custom Date/Time Filter</label>
                  <input className="form-check-input ms-3" type="checkbox" name="customTime" id="sysform_customTime" value={formState.customTime} defaultChecked={formState.customTime} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketFromTime-lbl" htmlfor="sysform_marketFromTime" title="With To Date/Time, filter on markets between dates/time. Limit 24 hours in advance.Format YYYY-MM-DD HH:MM:SS." hidden={formState.customTime ? "" : "hidden"} >From Date/Time</label>
                  <input className="form-control w-75" type="text" name="marketFromTime" id="sysform_marketFromTime" value={formState.marketFromTime} hidden={formState.customTime ? "" : "hidden"} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketToTime-lbl" htmlfor="sysform_marketToTime" title="With From Date/Time, filter on markets between dates/time. Limit 24 hours in advance.Format YYYY-MM-DD HH:MM:SS" hidden={formState.customTime ? "" : "hidden"}>To Time</label>
                  <input className="form-control w-75" type="text" name="marketToTime" id="sysform_marketToTime" value={formState.marketToTime} hidden={formState.customTime ? "" : "hidden"} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_maxResults-lbl" htmlfor="sysform_maxResults" title="Number of markets to return. Max 1000. Default 1000.">Maximum Results</label>
                  <input className="form-control w-75" type="number" name="maxResults" id="sysform_maxResults" max="1000" step="1" min="0" value={formState.maxResults} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sysform_marketProjection-lbl" htmlfor="sysform_marketProjection" title="Data to return about market. Multiple options available.">Market Projection</label>
                  <input className="form-control w-75" type="text" name="marketProjection" id="sysform_marketProjection" value={formState.marketProjection} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </form>
    </section>
  );
};

export default Header;
