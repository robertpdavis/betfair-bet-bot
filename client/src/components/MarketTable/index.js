import React, { useMemo } from "react";
import { Link } from "react-router-dom";;


function MarketTable({ eventData }) {

  const events = eventData.events;
  const rows = events.length;

  console.log(events)

  if (rows > 0) {
    return (
      <div className="table-responsive">
        <table className="table table-sm text-center">
          <tbody>
            {events.map((row, i) => {
              return (
                <tr key={i}>
                  <td className="text-start w-25" key={0} >{events[i].eventName}</td>
                  {events[i].markets.map((market, m) => {
                    if (m % 2) {
                      return (<td key={m}><Link to={"/market/" + market._id}>{new Date(market.marketTime).toLocaleString().substring(12, 17)}</Link></td>)
                    }
                  }
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (<h5>There are no current events for this system.</h5>);
  }
}


export default MarketTable;