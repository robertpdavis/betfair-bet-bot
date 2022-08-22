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

  const market = data?.market || {};
  const runners = market.runners;


  // console.log(runners)

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
            <h5>{new Date(market.marketTime).toLocaleString().substring(12, 17)}  {market.eventName}</h5>
            <h6>
              {new Date(market.marketTime).toLocaleString()}
              <br></br>
              WIN | PLACE
            </h6>
          </div>
          <div className="col-4">
            <div className="col-6 text-end">
              <h6>STATUS:{market.status}</h6>
              <h6>TOTAL MATCHED:{market.totalMatched}</h6>
              <h6>TOTAL AVAILABLE:{market.totalAvailable}</h6>
            </div>
          </div>
          <div className="col-4">
            <div className="form-check">
              Going Into Play
              <input type="checkbox" className="form-check-input" disable="true"></input>
            </div>
          </div>
        </div>
        <RunnerTable runners={runners} />
      </section>
    </main>
  )
};

export default SingleMarket;
