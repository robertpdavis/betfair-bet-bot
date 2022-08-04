import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_SYSTEMS, QUERY_RESULTS, QUERY_SYSTEM_AG } from '../utils/queries';

const Dashboard = () => {


  let userId = '';
  let username = ''
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    userId = user.data._id;
    username = user.data.username;
  }

  const { loading: loadingU, data: dataU } = useQuery(QUERY_USER,
    {
      variables: { username }
    });

  const userData = dataU?.user || {};

  const { loading: loadingS, data: dataS } = useQuery(QUERY_SYSTEMS,
    {
      variables: { userId, isActive: true },
    });

  const systemData = dataS?.systems || {};


  const { loading: loadingR, data: dataR } = useQuery(QUERY_RESULTS,
    {
      variables: { userId: userId },
    });

  const resultData = dataR?.results || {};

  const { loading: loadingA, data: data } = useQuery(QUERY_SYSTEM_AG,
    {
      variables: { userId }
    });

  const agData = dataU?.systemAg || {};

  console.log(agData);

  if (!Auth.loggedIn()) { return <Navigate to="/login" /> };


  if (loadingS || loadingR) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <section className="container my-2">
        <div className="page-header">
          Dashboard
        </div>

        <div className="sub-header dashboard">
          Betting Status
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <div>
              <h5>Current Virtual Wallet: ${userData.virtualWallet}</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-sm text-center">
                <thead>
                  <tr>
                    <th>Events Bed On</th>
                    <th>Markets Bet On</th>
                    <th>Total Bets Made</th>
                    <th>Total Winners</th>
                    <th>Total Losers</th>
                    <th>Unsettled Bets</th>
                    <th>Overall Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="sub-header dashboard">
          Active System Status
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm text-center dashboard-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>System Name</th>
                    <th>Status</th>
                    <th>Betting Mode</th>
                    <th>Bet Type</th>
                    <th>Total Events</th>
                    <th>Total Markets</th>
                    <th>Total Bets</th>
                    <th>Unsetlled Bets</th>
                    <th>Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {systemData.map((row, i) => {
                    return (
                      <tr key={i}>
                        <td>{row.systemId}</td>
                        <td>{row.title}</td>
                        <td>{row.isActive ? 'Active' : 'Disabled'}</td>
                        <td>{row.mode}</td>
                        <td>{row.betType}</td>
                        <td>{row.totalEvents}</td>
                        <td>{row.totalMarkets}</td>
                        <td>{row.totalBets}</td>
                        <td>{row.unsettledBets}</td>
                        <td>{(row.profitLoss / 100).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="sub-header dashboard">
          Latest Bets
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm text-center dashboard-table">
                <thead>
                  <tr>
                    <th>Bet Placed</th>
                    <th>Event Name</th>
                    <th>Market Name</th>
                    <th>Selection Name</th>
                    <th>Order Type</th>
                    <th>Order Status</th>
                    <th>Bet Type</th>
                    <th>Bet Outcome</th>
                    <th>Price Matched</th>
                    <th>Size Matched</th>
                    <th>Bet Liability</th>
                    <th>Profit/Loss</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {resultData.slice(0, 4).map((row, i) => {
                    return (
                      <tr key={i}>
                        <td>{new Date(row.betPlaced).toLocaleString()}</td>
                        <td>{row.eventName}</td>
                        <td>{row.marketName}</td>
                        <td>{row.selectionName}</td>
                        <td>{row.orderType}</td>
                        <td>{row.orderStatus}</td>
                        <td>{row.betType}</td>
                        <td>
                          {row.betOutcome === 'Win' ?
                            <span className="badge bg-success">{row.betOutcome}</span> :
                            row.betOutcome === 'Lose' ?
                              <span className="badge bg-warning">{row.betOutcome}</span> :
                              row.betOutcome}
                        </td>
                        <td>{(row.priceMatched / 100).toFixed(2)}</td>
                        <td>{(row.sizeMatched / 100).toFixed(2)}</td>
                        <td>{(row.liability / 100).toFixed(2)}</td>
                        <td>{(row.profitLoss / 100).toFixed(2)}</td>
                        <td>
                          {row.betStatus === 'Open' ?
                            <span className="badge bg-success">{row.betStatus}</span> :
                            <span className="badge bg-secondary">{row.betStatus}</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
