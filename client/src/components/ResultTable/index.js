import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import dateFormat from "../../utils/dateFormat";


function ResultTable({ resultData }) {

  const results = resultData.results;
  const rows = results.length;

  console.log(results)

  if (rows > 0) {
    return (
      <div className="table-responsive">
        <table className="table table-sm text-center">
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
            {results.map((row, i) => {
              return (
                <tr key={i}>
                  <td><Link to={"/result/" + row._id}>{new Date(row.betPlaced).toLocaleString()}</Link></td>
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
    );
  } else {
    return (<h5>There are no current results for this system.</h5>);
  }
}


export default ResultTable;