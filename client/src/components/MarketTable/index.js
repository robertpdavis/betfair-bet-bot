import React, { useMemo } from "react";
import { Link } from "react-router-dom";;


function MarketTable({ eventData }) {

  const events = eventData.events;
  const rows = events.length;

  console.log(events)

  if (rows > 0) {
    return (
      <table className="table table-striped">
        <tbody>
          {events.map((row, i) => {
            return (
              <tr key={i}>
                <td className="w-auto">{events[i].eventName}</td>
                {events[i].markets.map((market, m) => {
                  if (m % 2) {
                    return (<td><Link to={"/market/" + market._id}>{new Date(market.marketTime).toLocaleString().substring(12, 17)}</Link></td>)
                  }
                }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return (<h5>There are no current events for this system.</h5>);
  }
}


export default MarketTable;