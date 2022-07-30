import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";;


function ResultTable({ resultData }) {

  const results = resultData.results;
  const rows = results.length;

  console.log(results)

  if (rows > 0) {
    return (
      <table className="table table-striped">
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
                <td><Link to={"/result/" + row._id}>{new Date(row.betPlaced).toLocaleString().substring(12, 17)}</Link></td>
                <td>{row.eventName}</td>
                <td>{row.marketName}</td>
                <td>{row.selectionName}</td>
                <td>{row.orderType}</td>
                <td>{row.orderStatus}</td>
                <td>{row.betType}</td>
                <td>{row.betOutcome}</td>
                <td>{row.priceMatched / 100}</td>
                <td>{row.sizeMatched / 100}</td>
                <td>{row.liability / 100}</td>
                <td>{row.profitLoss / 100}</td>
                <td>{row.betStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return (<h5>There are no current results for this system.</h5>);
  }
}


export default ResultTable;