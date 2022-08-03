import React, { useState } from 'react';
import '../../App.css'

const ResultForm = (props) => {

  const result = props.result;

  const [formState, setFormState] = useState(result);

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

  return (
    <section className="container">
      <form>
        <div>
          <h5>Bet Details</h5>
          <h5 className="d-inline pe-2">{result.betOutcome === 'Win' ?
            <span className="badge bg-success">{result.betOutcome}</span>
            : result.betOutcome === 'Lose' ?
              <span className="badge bg-danger">{result.betOutcome}</span>
              : result.betOutcome === 'Void' ?
                <span className="badge bg-secondary">{result.betOutcome}</span>
                : <span className="badge bg-secondary">'Pending'</span>
          }</h5>
          <h5 className="d-inline">{result.betStatus === 'Open' ? <span className="badge bg-success">{result.betStatus}</span> : <span className="badge bg-secondary">{result.betStatus}</span>}</h5>
          <hr></hr>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_betId-lbl" htmlFor="resform_betId" title="&lt;strong&gt;Bet Id&lt;/strong&gt;"> Bet Id</label>
              <input type="text" name="betId" id="resform_betId" defaultValue={result.betId} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_customerRef-lbl" htmlFor="resform_customerRef" title="Betfair Customer Ref" data-content="Reference for the placed bet">Betfair Customer Ref</label>
              <input type="text" name="customerRef" id="resform_customerRef" defaultValue={result.customerRef} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_betPlaced-lbl" htmlFor="resform_betPlaced" title="Bet Placed" data-content="The date and time the bet was placed">Bet Placed</label>
              <input type="text" name="betPlaced" id="resform_betPlaced" defaultValue={result.betPlaced} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_orderType-lbl" htmlFor="resform_orderType" title="Order Type" data-content="The type of order">Order Type</label>
              <input type="text" name="orderType" id="resform_orderType" defaultValue={result.orderType} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_orderStatus-lbl" htmlFor="resform_orderStatus" title="&lt;strong&gt;Order Status&lt;/strong&gt;">Order Status</label>
              <input type="text" name="orderStatus" id="resform_orderStatus" defaultValue={result.orderStatus} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_betType-lbl" htmlFor="resform_betType" title="&lt;strong&gt;Bet Type&lt;/strong&gt;"> Bet Type</label>
              <input type="text" name="betType" id="resform_betType" defaultValue={result.betType} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_racingBetType-lbl" htmlFor="resform_racingBetType" title="&lt;strong&gt;Racing Bet Type&lt;/strong&gt;"> Racing Bet Type</label>
              <input type="text" name="racingBetType" id="resform_racingBetType" defaultValue={result.racingBetType} className="form-control w-75" size="30" readOnly />
            </div>
          </div>
          <div className="col-6">
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_eventName-lbl" htmlFor="resform_eventName" title="Event Name" data-content="Event the bet was placed in">Event Name</label>
              <input type="text" name="eventName" id="resform_eventName" defaultValue={result.eventName} className="form-control w-75" size="50" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_eventId-lbl" htmlFor="resform_eventId" title="Event Id" data-content="The event id">Event Id</label>
              <input type="text" name="eventId" id="resform_eventId" defaultValue={result.eventId} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_marketName-lbl" htmlFor="resform_marketName" title="Market Name" data-content="The market the bet was placed in">Market Name</label>
              <input type="text" name="marketName" id="resform_marketName" defaultValue={result.marketName} className="form-control w-75" size="50" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_marketId-lbl" htmlFor="resform_marketId" title="Market Id" data-content="The market id">Market Id</label>
              <input type="text" name="marketId" id="resform_marketId" defaultValue={result.marketId} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_selectionName-lbl" htmlFor="resform_selectionName" title="Selection Name" data-content="Bet selection">Selection Name</label>
              <input type="text" name="selectionName" id="resform_selectionName" defaultValue={result.selectionName} className="form-control w-75" size="50" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_selectionId-lbl" htmlFor="resform_selectionId" title="Selection Id" data-content="Bet selection id">Selection Id</label>
              <input type="text" name="selectionId" id="resform_selectionId" defaultValue={result.selectionId} className="form-control w-75" size="30" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_persistence-lbl" htmlFor="resform_persistence" title="Persisitance" data-content="Lapse, Persist or Marktet On Close. For limit orders.">Persisitance</label>
              <input type="text" name="persistence" id="resform_persistence" defaultValue={result.persistence} className="form-control w-75" size="15" readOnly />
            </div>
          </div>
        </div>
        <h5>Price & Size Details</h5>
        <hr></hr>
        <div className="row">
          <div className="col-6">
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_reqPrice-lbl" htmlFor="resform_reqPrice" title="Price Requested" data-content="Price requested when bet placed">Price Requested</label>
              <input type="text" name="reqPrice" id="resform_reqPrice" defaultValue={(result.reqPrice / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_priceMatched-lbl" htmlFor="resform_priceMatched" title="Price Matched" data-content="Price actually matched">Price Matched</label>
              <input type="text" name="priceMatched" id="resform_priceMatched" defaultValue={(result.priceMatched / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_matchedDate-lbl" htmlFor="resform_matchedDate" title="Matched Date" data-content="Last time bet was matched">Matched Date</label>
              <input type="text" name="matchedDate" id="resform_matchedDate" defaultValue={result.matchedDate} className="form-control w-75" size="15" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_priceReduced-lbl" htmlFor="resform_priceReduced" title="Price Reduced" data-content="Has the price been reduced?">Price Reduced</label>
              <input type="checkbox" name="priceReduced" id="resform_priceReduced" defaultChecked={result.priceReduced} className="form-check-input ms-3" />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_liability-lbl" htmlFor="resform_liability" title="Bet Liability" data-content="The liability of the bet">Bet Liability</label>
              <input type="text" name="liability" id="resform_liability" defaultValue={(result.liability / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
          </div>
          <div className="col-6">
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_size-lbl" htmlFor="resform_size" title="Bet Size Placed" data-content="The size of the bet placed">Bet Size Placed</label>
              <input type="text" name="size" id="resform_size" defaultValue={(result.size / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_sizeMatched-lbl" htmlFor="resform_sizeMatched" title="Size Matched" data-content="The bet size that has been matched. Stake is 2 x size for place markets.">Size Matched</label>
              <input type="text" name="sizeMatched" id="resform_sizeMatched" defaultValue={(result.sizeMatched / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_sizeRemaining-lbl" htmlFor="resform_sizeRemaining" title="Size Remaining" data-content="The remaining part of the bet to be matched">Size Remaining</label>
              <input type="text" name="sizeRemaining" id="resform_sizeRemaining" defaultValue={(result.sizeRemaining / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_sizeLapsed-lbl" htmlFor="resform_sizeLapsed" title="Size Lapsed" data-content="The amount of the bet that was lapsed">Size Lapsed</label>
              <input type="text" name="sizeLapsed" id="resform_sizeLapsed" defaultValue={(result.sizeLapsed / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_sizeVoided-lbl" htmlFor="resform_sizeVoided" title="Size Voided" data-content="The amount if the bet that was voided">Size Voided</label>
              <input type="text" name="sizeVoided" id="resform_sizeVoided" defaultValue={(result.sizeVoided / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_sizeCancelled-lbl" htmlFor="resform_sizeCancelled" title="Size Cancelled" data-content="The amount of the bet that was available to be matched, before cancellation or lapsing">Size Cancelled</label>
              <input type="text" name="sizeCancelled" id="resform_sizeCancelled" defaultValue={(result.sizeCancelled / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
          </div>
        </div>
        <h5>Settled Details</h5>
        <hr></hr>
        <div className="row">
          <div className="col-6">
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_settledDate-lbl" htmlFor="resform_settledDate" title="Settled Date" data-content="The date/time the bet was settled">Settled Date</label>
              <input type="text" name="settledDate" id="resform_settledDate" defaultValue={result.settledDate} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_sizeSettled-lbl" htmlFor="resform_sizeSettled" title="Size Settled" data-content="The size of the bet settled">Size Settled</label>
              <input type="text" name="sizeSettled" id="resform_sizeSettled" defaultValue={(result.sizeSettled / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_commissionperc-lbl" htmlFor="resform_commissionperc" title="Commission Percent" data-content="The betfair commission amount">Commission Percent</label>
              <input type="text" name="commissionperc" id="resform_commissionperc" defaultValue={result.commissionperc} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_commission-lbl" htmlFor="resform_commission" title="Commission" data-content="The betfair commission on the bet">Commission</label>
              <input type="text" name="commission" id="resform_commission" defaultValue={(result.commission / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
          </div>
          <div className="col-6">
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_profitLoss-lbl" htmlFor="resform_profitLoss" title="Profit/Loss" data-content="Profit/Loss of the bet">Profit/Loss</label>
              <input type="text" name="profitLoss" id="resform_profitLoss" defaultValue={(result.profitLoss / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_returned-lbl" htmlFor="resform_returned" title="Amount Paid" data-content="Amount paid out from Betfair">Amount Paid</label>
              <input type="text" name="returned" id="resform_returned" defaultValue={(result.returned / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div>
            <div className="col-auto mb-3">
              <label className="form-label" id="resform_wallet-lbl" htmlFor="resform_wallet" title="Wallet" data-content="System wallet at last bet update">Wallet At Bet</label>
              <input type="text" name="wallet" id="resform_wallet" defaultValue={(result.wallet / 100).toFixed(2)} className="form-control w-75" size="10" readOnly />
            </div >
          </div >
        </div >
      </form >
    </section >
  );
};

export default ResultForm;
