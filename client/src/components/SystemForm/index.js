import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../App.css'
import Auth from '../../utils/auth';

const SystemForm = (props) => {

  const eventTypes = props.eventTypes;

  //Create options list for the Event Type form field
  let eventOptions = '';
  if (eventTypes.length > 0) {
    eventOptions = eventTypes.map((option) => {
      return <option value={option.eventTypeId} key={option.eventTypeId}>{option.name}</option>
    })
  }

  const formType = props.formType;

  let formData = '';
  let scenarioParams = '';
  let stakingParams = '';

  if (formType === 'edit') {
    formData = { ...props.systemData };
    scenarioParams = JSON.parse(formData.scenarioParams);
    stakingParams = JSON.parse(formData.stakingParams);
  }

  const [key, setKey] = useState('details');

  const handleChange = async (event) => {

    props.handleFormChange(event);
  };

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
                  <label className="form-label" id="title-lbl" htmlFor="title" title="Name of the betting system">System Name<span className="star">&#160;*</span></label>
                  <input className="form-control w-75" type="text" id="title" name="title" defaultValue={formData.title} size="30" required aria-required="true" onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="eventTypeId-lbl" htmlFor="eventTypeId" title="The event type the system will bet on">Event Type<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="eventTypeId" name="eventTypeId" defaultValue={formData.eventTypeId} required aria-required="true" onChange={handleChange}>
                    {eventOptions}
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="scenario-lbl" htmlFor="scenarioId" title="Select the betting scenario to use with this sysetm">Scenario Selection<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="scenarioId" name="scenarioId" defaultValue={formData.scenario[0].scenarioId} required aria-required="true" onChange={handleChange}>
                    <option value="1">Back The Favourite (Back/Lay)</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="stakingPlan-lbl" htmlFor="stakingPlan" title="Select the staking plan to use with this system">Staking Plan<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="stakingPlan" name="stakingId" defaultValue={formData.stakingPlan[0].stakingId} required aria-required="true" onChange={handleChange}>
                    <option value="1">Fixed Stake (Back/Lay)</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="mode-lbl" htmlFor="mode" title="Select Live or Simulated betting">Betting Mode<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" type="text" id="mode" name="mode" defaultValue={formData.mode} required aria-required="true" onChange={handleChange}>
                    <option value="Simulated">Simulated</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="description-lbl" htmlFor="description" title="Short description of betting system">System Description<span className="star">&#160;*</span></label>
                  <textarea className="form-control textarea w-75" name="description" id="description" cols="50" rows="4" defaultValue={formData.description} required aria-required="true" onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="includeCommission-lbl" htmlFor="includeCommission" title="Include commissions in profit/loss calculations">Include Commissions</label>
                  <input className="form-check-input ms-3" type="checkbox" name="includeCommission" id="includeCommission" defaultChecked={formData.includeCommission === true ? true : false} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="isRacingEvent-lbl" htmlFor="isRacingEvent" title="Racing systems require Win and Place markets by default">Is this a racing system?</label>
                  <input className="form-check-input ms-3" type="checkbox" name="isRacingEvent" id="isRacingEvent" defaultChecked={formData.isRacingEvent === true ? true : false} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="stats" title="System Stats">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="profitLoss-lbl" htmlFor="profitLoss" title="Total profit/loss of system">Profit/Loss</label>
                  <input className="form-control w-75" type="number" name="profitLoss" id="profitLoss" defaultValue={formData.profitLoss / 100} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxBet-lbl" htmlFor="maxBet" title="Maximum bet amount made">Max Bet Made</label>
                  <input className="form-control w-75" type="number" name="maxBet" id="maxBet" defaultValue={formData.maxBet / 100} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="unsettledBets-lbl" htmlFor="unsettledBets" title="Bets yet to be settled">Unsettled Bets</label>
                  <input className="form-control w-75" type="number" name="unsettledBets" id="unsettledBets" defaultValue={formData.unsettledBets} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="totalBets-lbl" htmlFor="totalBets" title="Total bets made">Total Bets Made</label>
                  <input className="form-control w-75" type="number" name="totalBets" id="totalBets" defaultValue={formData.totalBets} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="totalEvents-lbl" htmlFor="totalEvents" title="Total events bet on">Events Bet On</label>
                  <input className="form-control w-75" type="number" name="totalEvents" id="totalEvents" defaultValue={formData.totalEvents} readOnly />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="totalMarkets-lbl" htmlFor="totalMarkets" title="Total markets bet on">Markets Bet On</label>
                  <input className="form-control w-75" type="number" name="totalMarkets" id="totalMarkets" defaultValue={formData.totalMarkets} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="totalWinners-lbl" htmlFor="totalWinners" title="Total bets won">Total Winners</label>
                  <input className="form-control w-75" type="number" name="totalWinners" id="totalWinners" defaultValue={formData.totalWinners} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="totalLosers-lbl" htmlFor="totalLosers" title="Total bets lost">Total Losers</label>
                  <input className="form-control w-75" type="number" name="totalLosers" id="totalLosers" defaultValue={formData.totalLosers} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="totalConsecWinners-lbl" htmlFor="totalConsecWinners" title="Total winners in a row">Consecutive Winners</label>
                  <input className="form-control w-75" type="number" name="totalConsecWinners" id="totalConsecWinners" defaultValue={formData.totalConsecWinners} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="totalConsecLosers-lbl" htmlFor="totalConsecLosers" title="Total loses in a row">Consecutive Losers</label>
                  <input className="form-control w-75" type="number" name="totalConsecLosers" id="totalConsecLosers" defaultValue={formData.totalConsecLosers} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="savestats-lbl" htmlFor="savestats" title="Save changes to system statistics">Save Statistics</label>
                  <input className="form-check-input ms-3" type="checkbox" name="savestats" id="savestats" defaultChecked={false} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="limits" title="System Limits">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="stopLoss-lbl" htmlFor="stopLoss" title="System will stop if loss reaches this. 0 = off.">Loss Stop</label>
                  <input className="form-control w-75" type="number" name="stopLoss" id="stopLoss" defaultValue={formData.stopLoss} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="stopProfit-lbl" htmlFor="stopProfit" title="System will stop if profit reaches this. 0 = off.">Profit Stop</label>
                  <input className="form-control w-75" type="number" name="stopProfit" id="stopProfit" defaultValue={formData.stopProfit} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxRunners-lbl" htmlFor="maxRunners" title="Bet will be placed on races with &lt;= this number of runners. 0 = off.">Max Runners</label>
                  <input className="form-control w-75" type="number" name="maxRunners" id="maxRunners" defaultValue={formData.maxRunners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="minRunners-lbl" htmlFor="minRunners" title="Bet will be placed on races with &gt;= this number of runners. 0 = off.">Min Runners</label>
                  <input className="form-control w-75" type="number" name="minRunners" id="minRunners" defaultValue={formData.minRunners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxWinners-lbl" htmlFor="maxWinners" title="System will stop winners reaches this. 0 = off.">Maximum Winners</label>
                  <input className="form-control w-75" type="number" name="maxWinners" id="maxWinners" defaultValue={formData.maxWinners} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxLosers-lbl" htmlFor="maxLosers" title="System will stop when losers reaches this. 0 = off.">Maximum Losers</label>
                  <input className="form-control w-75" type="number" name="maxLosers" id="maxLosers" defaultValue={formData.maxLosers} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="consecLosers-lbl" htmlFor="consecLosers" title="System will stop when consecutive losers reaches this. 0 = off.">Consecutive Losers</label>
                  <input className="form-control w-75" type="number" name="consecLosers" id="consecLosers" defaultValue={formData.consecLosers} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="consecWinners-lbl" htmlFor="consecWinners" title="System will stop when consecutive winners reaches this. 0 = off.">Consecutive Winners</label>
                  <input className="form-control w-75" type="number" name="consecWinners" id="consecWinners" defaultValue={formData.consecWinners} onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxEvents-lbl" htmlFor="maxEvents" title="Maximum number of events system will bet on. 0 = off.">Max Events</label>
                  <input className="form-control w-75" type="number" name="maxEvents" id="maxEvents" defaultValue={formData.maxEvents} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxMarkets-lbl" htmlFor="maxMarkets" title="Maximum number of markets system will bet on. 0 = off.">Max Markets</label>
                  <input className="form-control w-75" type="number" name="maxMarkets" id="maxMarkets" defaultValue={formData.maxMarkets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxBets-lbl" htmlFor="maxBets" title="System will stop when this is reached. 0 = off.">Maximum Bets</label>
                  <input className="form-control w-75" type="number" name="maxBets" id="maxBets" defaultValue={formData.maxBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="minBets-lbl" htmlFor="minBets" title="System will continue until at least this is reached. 0 = off.">Minimum Bets</label>
                  <input className="form-control w-75" type="number" name="minBets" id="minBets" defaultValue={formData.minBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxBackLayRatio-lbl" htmlFor="maxBackLayRatio" title="Bet will be placed on market &lt;= this. 0 = off.">Maximum Back to Lay Ratio</label>
                  <input className="form-control w-75" type="number" name="maxBackLayRatio" id="maxBackLayRatio" defaultValue={formData.maxBackLayRatio} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxBookBackBets-lbl" htmlFor="maxBookBackBets" title="0 = off.">Maximum Book Back</label>
                  <input className="form-control w-75" type="number" name="maxBookBackBets" id="maxBookBackBets" defaultValue={formData.maxBookBackBets} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="minBookLayBets-lbl" htmlFor="minBookLayBets" title="0 = off.">Minimum Book Lay</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="minBookLayBets" defaultValue={formData.minBookLayBets} onChange={handleChange} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="settings" title="Bet Settings">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="betType-lbl" htmlFor="betType" title="Back or Lay betting">Bet Type<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="betType" name="betType" defaultValue={formData.betType} required aria-required="true" onChange={handleChange}>
                    <option value="Back">Back</option>
                    <option value="Lay">Lay</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="racingBetType-lbl" htmlFor="racingBetType" title="Set racing event bet type. Either WIN or PLACE.">Racing Bet Type<span className="star">&#160;*</span></label>
                  <select className="form-control w-75" id="racingBetType" name="racingBetType" defaultValue={formData.racingBetType} required aria-required="true" onChange={handleChange}>
                    <option value="WIN">WIN</option>
                    <option value="PLACE">PLACE</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="timeSecsRace-lbl" htmlFor="timeSecsRace" title="Time in seconds to bet before event starts. 30-3600.">Time Out To Bet</label>
                  <input className="form-control w-75" type="number" name="timeSecsRace" id="timeSecsRace" max="3600" step="1" min="30" defaultValue={formData.timeSecsRace} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="minOdds-lbl" htmlFor="minOdds" title="Bet will be placed on odds &gt;= this. 0 = off.">Minimum Odds</label>
                  <input className="form-control w-75" type="number" name="minOdds" id="minOdds" defaultValue={formData.minOdds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxOdds-lbl" htmlFor="maxOdds" title="Bet will be placed on odds &lt;= this. 0 = off.">Maximum Odds</label>
                  <input className="form-control w-75" type="number" name="maxOdds" id="maxOdds" defaultValue={formData.maxOdds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxLiability-lbl" htmlFor="maxLiability" title="Bet will not be placed if liability exceeds this. 0 = off.">Maximum Liability</label>
                  <input className="form-control w-75" type="number" name="maxLiability" id="maxLiability" defaultValue={formData.maxLiability} onChange={handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="unsettledLimit-lbl" htmlFor="unsettledLimit" title="System will stop if total unsettled bets reaches this. 0 = off.">Unsettled Bet Limit</label>
                  <input className="form-control w-75" type="number" name="unsettledLimit" id="unsettledLimit" defaultValue={formData.unsettledLimit} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="minBookLayBets-lbl" htmlFor="minBookLayBets" title="0 = off.">Minimum Matched</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="minBookLayBets" defaultValue={formData.minMatched} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="minBookLayBets-lbl" htmlFor="minBookLayBets" title="0 = off.">Race Numbers</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="minBookLayBets" defaultValue={formData.raceNumbers} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="minBookLayBets-lbl" htmlFor="minBookLayBets" title="0 = off.">Race Disances</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="minBookLayBets" defaultValue={formData.raceDistance} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="minBookLayBets-lbl" htmlFor="minBookLayBets" title="0 = off.">Race Classes</label>
                  <input className="form-control w-75" type="number" name="minBookLayBets" id="minBookLayBets" defaultValue={formData.raceClass} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="betStartingPrice-lbl" htmlFor="betStartingPrice" title="Bet on markets where BSP available">Bet On BSP</label>
                  <input className="form-check-input ms-3" type="checkbox" name="betStartingPrice" id="betStartingPrice" defaultChecked={formData.betStartingPrice === true ? true : false} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <legend>Scenario Details</legend>
                <hr></hr>
                <div className="col-auto mb-3">
                  <label className="form-label" id="scenarioTitle-lbl" htmlFor="scenarioTitle" title="Name of the scenario">Scenario Name</label>
                  <input className="form-control w-75" type="text" name="scenarioTitle" id="scenarioTitle" defaultValue={formData.scenario[0].title} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="scenarioDesc-lbl" htmlFor="scenarioDescription" title="Description of the scenario">Scenario Description</label>
                  <textarea className="form-control w-75" name="scenarioDescription" id="scenarioDesc" cols="50" rows="6" defaultValue={formData.scenario[0].description} readOnly />
                </div>
                {/* Scenario params */}
                {scenarioParams.map((param) => {
                  let attribtutes = {};
                  if (param.attr) {
                    for (const attribute in param.attr) {
                      if (Object.hasOwnProperty.call(param.attr, attribute)) {
                        attribtutes[attribute] = param.attr[attribute];
                      }
                    }
                  }
                  if (param.type === 'text' || param.type === 'number' || param.type === 'currency') {
                    if (param.type === 'currency') {
                      param.type = 'number';
                      param.value = (param.value / 100).toFixed(2);
                    }
                    return (
                      <div className="col-auto mb-3" key={param.name}>
                        <label className="form-label" id={param.name + '-lbl'} htmlFor={'scenarioparams-' + param.name} title={param.desc}>{param.label}</label>
                        <input className="form-control w-75" type={param.type} name={'scenarioparams-' + param.name} id={'scenarioparams-' + param.name} {...attribtutes} defaultValue={param.value} onChange={handleChange} />
                      </div>
                    );
                  } else {
                    return "";
                  }
                })}
              </div>
              <div className="col-6">
                <legend>Staking Plan Details</legend>
                <hr></hr>
                <div className="col-auto mb-3">
                  <label className="form-label" id="stakingTitle-lbl" htmlFor="stakingTitle" title="Description of the staking plan">Staking Plan Name</label>
                  <input className="form-control w-75" type="text" name="stakingTitle" id="stakingTitle" defaultValue={formData.stakingPlan[0].title} readOnly />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="stakingDesc-lbl" htmlFor="stakingDesc" title="Description of the staking plan">Staking Plan Description</label>
                  <textarea className="form-control w-75" name="stakingDescription" id="stakingDesc" cols="50" rows="6" defaultValue={formData.stakingPlan[0].description} readOnly />
                </div>
                {/* Staking params */}
                {stakingParams.map((param) => {
                  let attribtutes = {};
                  if (param.attr) {
                    for (const attribute in param.attr) {
                      if (Object.hasOwnProperty.call(param.attr, attribute)) {
                        attribtutes[attribute] = param.attr[attribute];
                      }
                    }
                  }
                  if (param.type === 'text' || param.type === 'number' || param.type === 'currency') {
                    if (param.type === 'currency') {
                      param.type = 'number';
                      param.value = (param.value / 100).toFixed(2);
                    }
                    return (
                      <div className="col-auto mb-3" key={param.name}>
                        <label className="form-label" id={param.name + '-lbl'} htmlFor={'stakingparams-' + param.name} title={param.desc}>{param.label}</label>
                        <input className="form-control w-75" type={param.type} name={'stakingparams-' + param.name} id={'stakingparams-' + param.name} {...attribtutes} defaultValue={param.value} onChange={handleChange} />
                      </div>
                    );
                  } else if (param.type === 'select') {
                    let options = '';
                    if (param.options) {
                      options = param.options.map((option) => {
                        return <option value={option.value} key={option.value}>{option.text}</option>
                      })
                    }
                    return (
                      <div className="col-auto mb-3" key={param.name}>
                        <label className="form-label" id={param.name + '-lbl'} htmlFor={'stakingparams-' + param.name} title={param.desc}>{param.label}</label>
                        <select className="form-control w-75" name={'stakingparams-' + param.name} id={'stakingparams-' + param.name} {...attribtutes} defaultValue={param.value} onChange={handleChange}>
                          {options}
                        </select>
                      </div>
                    );
                  } else {
                    return "";
                  }
                })}
              </div>
            </div>

          </Tab>
          <Tab eventKey="filter" title="System Filter Settings">
            <div className="row">
              <div className="col-6">
                <div className="col-auto mb-3">
                  <label className="form-label" id="textQuery-lbl" htmlFor="textQuery" title="Filter Query" data-content="Text to filter markets to bet on">Filter Query</label>
                  <input className="form-control w-75" type="text" name="textQuery" id="textQuery" defaultValue={formData.textQuery} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="marketIds-lbl" htmlFor="marketIds" title="Market Ids" data-content="Filter markets to bet on by specific market Ids">Market Ids</label>
                  <input className="form-control w-75" type="text" name="marketIds" id="marketIds" defaultValue={formData.marketIds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="venues-lbl" htmlFor="venues" title="Filter markets to bet on by venue where applicable">Venues</label>
                  <input className="form-control w-75" type="text" name="venues" id="venues" defaultValue={formData.venues} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="turnInPlayEnabled-lbl" htmlFor="turnInPlayEnabled" title="Filter markets that are going in play">Going In Play</label>
                  <input className="form-check-input ms-3" type="checkbox" name="turnInPlayEnabled" id="turnInPlayEnabled" defaultChecked={formData.turnInPlayEnabled === true ? true : false} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="inPlayOnly-lbl" htmlFor="inPlayOnly" title="Filter markets that are currently in play">In Play Only</label>
                  <input className="form-check-input ms-3" type="checkbox" name="inPlayOnly" id="inPlayOnly" defaultChecked={formData.inPlayOnly === true ? true : false} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="marketBettingTypes-lbl" htmlFor="marketBettingTypes" title="Filter by bet types - i.e ODDS, LINE etc.">Bet Types</label>
                  <select className="form-control w-75" id="marketBettingTypes" name="marketBettingTypes" defaultValue={formData.marketBettingTypes} required aria-required="true" onChange={handleChange}>
                    <option value=""></option>
                    <option value="ODDS">Odds</option>
                    <option value="LINE">Line</option>
                    <option value="ASIAN_HANDICAP_DOUBLE_LINE">Asian Handicap Double Line</option>
                    <option value="ASIAN_HANDICAP_SINGLE_LINE">Asian Handicap Single Line</option>
                  </select>
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="marketCountries-lbl" htmlFor="marketCountries" title="Filter by countries. Entered as AU,GB etc.">Countries</label>
                  <input className="form-control w-75" type="text" name="marketCountries" id="marketCountries" defaultValue={formData.marketCountries} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="marketTypeCodes-lbl" htmlFor="marketTypeCodes" title="Filter by market types. Entered as WIN,PLACE etc.">Market Type</label>
                  <input className="form-control w-75" type="text" name="marketTypeCodes" id="marketTypeCodes" defaultValue={formData.marketTypeCodes} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="sort-lbl" htmlFor="sort" title="Determines how returned markets are displayed in events">Sort Order</label>
                  <select className="form-control w-75" id="sort" name="sort" defaultValue={formData.sort} required aria-required="true" onChange={handleChange}>
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
                  <label className="form-label" id="competitionIds-lbl" htmlFor="competitionIds" title="Filter markets to bet on by competitions where applicable">Comppetition Ids</label>
                  <input className="form-control w-75" type="text" name="competitionIds" id="competitionIds" defaultValue={formData.competitionIds} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="bspOnly-lbl" htmlFor="bspOnly" title="Filter markets where BSP is available">BSP Only Markets</label>
                  <input className="form-check-input ms-3" type="checkbox" name="bspOnly" id="bspOnly" defaultChecked={formData.bspOnly === true ? true : false} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="customTime-lbl" htmlFor="customTime" title="Filter on markets 'From Date/Time' to 'To Date/Time'. If omitted defult time set by system.">Use Custom Date/Time Filter</label>
                  <input className="form-check-input ms-3" type="checkbox" name="customTime" id="customTime" defaultChecked={formData.customTime === true ? true : false} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="marketFromTime-lbl" htmlFor="marketFromTime" title="With To Date/Time, filter on markets between dates/time. Limit 24 hours in advance.Format YYYY-MM-DD HH:MM:SS." hidden={formData.customTime ? "" : "hidden"} >From Date/Time</label>
                  <input className="form-control w-75" type="text" name="marketFromTime" id="marketFromTime" defaultValue={formData.marketFromTime} hidden={formData.customTime ? "" : "hidden"} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="marketToTime-lbl" htmlFor="marketToTime" title="With From Date/Time, filter on markets between dates/time. Limit 24 hours in advance.Format YYYY-MM-DD HH:MM:SS" hidden={formData.customTime ? "" : "hidden"}>To Time</label>
                  <input className="form-control w-75" type="text" name="marketToTime" id="marketToTime" defaultValue={formData.marketToTime} hidden={formData.customTime ? "" : "hidden"} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="maxResults-lbl" htmlFor="maxResults" title="Number of markets to return. Max 1000. Default 1000.">Maximum Results</label>
                  <input className="form-control w-75" type="number" name="maxResults" id="maxResults" max="1000" step="1" min="0" defaultValue={formData.maxResults} onChange={handleChange} />
                </div>
                <div className="col-auto mb-3">
                  <label className="form-label" id="marketProjection-lbl" htmlFor="marketProjection" title="Data to return about market. Multiple options available.">Market Projection</label>
                  <input className="form-control w-75" type="text" name="marketProjection" id="marketProjection" defaultValue={formData.marketProjection} onChange={handleChange} />
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
