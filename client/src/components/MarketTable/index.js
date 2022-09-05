import React, { useMemo } from "react";
import { Link } from "react-router-dom";;


function MarketTable({ eventData }) {

  const events = eventData.events;
  const rows = events.length;

  if (rows > 0) {
    return (
      <div className="table-responsive">
        <table className="table table-sm text-center">
          <tbody>
            {events.map((row, i) => {
              return (
                <tr key={events[i].eventId}>
                  <td className="text-start w-25">{events[i].eventName}</td>
                  {events[i].markets.map((market, m) => {
                    //For racing markets, only show WIN markets as includin PLACE markets will double up.Place market details shown in market view.
                    if (market.marketType === "PLACE") {
                      if (m % 2) {
                        return (<td key={m}><Link to={"/market/" + market.marketId}>{new Date(market.marketTime).toLocaleString().substring(12, 17)}</Link></td>)
                      }
                    } else {
                      return (<td key={m}><Link to={"/market/" + market.marketId}>{new Date(market.marketTime).toLocaleString().substring(12, 17)}</Link></td>)
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