import React, { useMemo } from "react";
import { Link } from "react-router-dom";;

function RunnerTable({ runners }) {

  const rows = runners.length;

  console.log(runners)

  if (rows > 0) {
    return (
      <div className="table-responsive">
        <table className="table table-sm border text-center">
          <tbody className="runner">
            {runners.map((row, i) => {
              let metadata = JSON.parse(row.metadata)
              let backPrices = JSON.parse(row.exAvailableToBack)
              let layPrices = JSON.parse(row.exAvailableToLay)
              return (
                <tr key={i}>
                  <td className="border">
                    {row.sortPriority}
                    <br></br>
                    ({metadata.STALL_DRAW})
                  </td>
                  <td className="text-start border">
                    J.{metadata.JOCKEY_NAME}
                    <br></br>
                    T.{metadata.TRAINER_NAME}
                  </td>
                  <td className="text-start border">colours</td>
                  <td className="text-start border">{(row.runnerName).split('.')[1].trim()}</td>
                  <td className="border">{row.status}</td>
                  <td className="border">Form:{metadata.FORM}</td>
                  {backPrices.map((priceSize, p) => {
                    return (
                      <td className="border" key={'bp' + p}>{priceSize.price.toFixed(2)}</td>
                    )
                  })}
                  {layPrices.reverse().map((priceSize, l) => {
                    return (
                      <td className="border" key={'lp' + l}>{priceSize.price.toFixed(2)}</td>
                    )
                  })}
                  <td className="border"></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (<h5>There are no runners for this market.</h5>);
  }
}

export default RunnerTable;