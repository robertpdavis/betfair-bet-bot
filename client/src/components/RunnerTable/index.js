import React, { useMemo } from "react";
import { Link } from "react-router-dom";;

function RunnerTable({ runners }) {

  const rows = runners.length;

  if (rows > 0) {
    return (
      <div className="table-responsive">
        <table className="table table-sm border text-center">
          <thead>
            <tr>
              <th colSpan="6"></th>
              <th colSpan="3">Back Prices</th>
              <th colSpan="3">Lay Prices</th>
              <th></th>
            </tr>
            <tr>
              <th scope="col">Id/Stall</th>
              <th>Jockey/Trainer</th>
              <th>Colours</th>
              <th>Selection Name</th>
              <th>Status</th>
              <th>Form</th>
              <th></th>
              <th></th>
              <th>Best</th>
              <th>Best</th>
              <th></th>
              <th></th>
              <th>Last</th>
            </tr>
          </thead>
          <tbody className="runner">
            {runners.map((row, i) => {
              let metadata = JSON.parse(row.metadata)
              let backPrices = JSON.parse(row.exAvailableToBack)
              let layPrices = JSON.parse(row.exAvailableToLay)
              let colours = `http://content-cache.betfair.com/feeds_images/Horses/SilkColours/${metadata.COLOURS_FILENAME}`;
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
                  <td className="text-center border"><img src={colours} alt="Colours N/A"></img></td>
                  <td className="text-start border">{(row.runnerName).split('.')[1].trim()}</td>
                  <td className="border">{row.status}</td>
                  <td className="border">Form:{metadata.FORM}</td>
                  {backPrices.map((priceSize, p) => {
                    if (p === 2) {
                      return (
                        <td className='border' style={{ backgroundColor: "lightblue" }} key={'bp' + p}>{priceSize.price.toFixed(2)}</td>
                      )
                    } else {
                      return (
                        <td className='border' key={'bp' + p}>{priceSize.price.toFixed(2)}</td>
                      )
                    }
                  })}
                  {layPrices.reverse().map((priceSize, l) => {
                    if (l === 0) {
                      return (
                        <td className='border' style={{ backgroundColor: "lightpink" }} key={'lp' + l}>{priceSize.price.toFixed(2)}</td>
                      )
                    } else {
                      return (
                        <td className='border' key={'lp' + l}>{priceSize.price.toFixed(2)}</td>
                      )
                    }
                  })}
                  <td className="border"></td>
                </tr>
              )
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