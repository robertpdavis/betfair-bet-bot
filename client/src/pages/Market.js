import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { QUERY_SINGLE_MARKET } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import RunnerTable from '../components/RunnerTable';


const SingleMarket = () => {

  let navigate = useNavigate();

  const { marketId } = useParams();


  const type = 'marketUpdate'
  const { loading, data } = useQuery(QUERY_SINGLE_MARKET, {
    variables: { marketId, type },
    pollInterval: 5000,
  });

  if (!Auth.loggedIn()) { navigate("login") };

  const marketData = data?.market || {};
  const runners = marketData.runners;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Market Details
        </div>
        <div className="row market-header">
          <div className="col-4">
            <h5>{new Date(marketData.marketTime).toLocaleString().substring(12, 17)}  {marketData.eventName}</h5>
            <h6>
              {new Date(marketData.marketTime).toDateString()} | {marketData.marketName}
              <br></br>
              WIN | PLACE
            </h6>
          </div>
          <div className="col-4">
            <div className="col-8 text-start">
              {marketData.status === 'OPEN' ? <h6>STATUS:&nbsp;<span className="badge bg-success">{marketData.status}</span></h6> : ''}
              {marketData.status === 'SUSPENDED' ? <h6>STATUS:&nbsp;<span className="badge bg-warning">{marketData.status}</span></h6> : ''}
              {marketData.status === 'CLOSED' ? <h6>STATUS:&nbsp;<span className="badge bg-secondary">{marketData.status}</span></h6> : ''}
              {marketData.status === 'VOID' ? <h6>STATUS:&nbsp;<span className="badge bg-primary">{marketData.status}</span></h6> : ''}
              <h6>TOTAL MATCHED:&nbsp;${(marketData.totalMatched).toFixed(2)}</h6>
              <h6>TOTAL AVAILABLE:&nbsp;${(marketData.totalAvailable).toFixed(2)}</h6>
            </div>
          </div>
          <div className="col-4">
            <div className="form-check">
              Going Into Play
              <input type="checkbox" className="form-check-input" checked={marketData.turnInPlayEnabled} readOnly></input>
            </div>
          </div>
        </div>
        <RunnerTable runners={runners} />
      </section>
    </main>
  )
};

export default SingleMarket;
