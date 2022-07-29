import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";;


function SystemTable({ systemData }) {

  const columns = useMemo(
    () => [
      {
        Header: "_id",
        accessor: "_id",
        isVisible: true
      },
      {
        Header: "Id",
        accessor: "systemId"
      },
      {
        Header: "System Name",
        accessor: "title"
      },
      {
        Header: "Status",
        accessor: "isActive"
      },
      {
        Header: "Betting Mode",
        accessor: "mode"
      },
      {
        Header: "Bet Type",
        accessor: "betType"
      },
      {
        Header: "Total Events",
        accessor: "totalEvents"
      },
      {
        Header: "Total Markets",
        accessor: "totalMarkets"
      },
      {
        Header: "Total Bets",
        accessor: "totalBets"
      },
      {
        Header: "Unsettled Bets",
        accessor: "unsettledBets"
      },
      {
        Header: "Profit/Loss",
        accessor: "profitLoss"
      },
    ],
    []
  );

  const data = useMemo(
    () => systemData.systems.map((item) => (
      {
        _id: item._id,
        systemId: item.systemId,
        title: item.title,
        isActive: (item.isActive ? 'Active' : 'Disabled'),
        mode: item.mode,
        betType: item.betType,
        totalEvents: item.totalEvents,
        totalMarkets: item.totalMarkets,
        totalBets: item.totalBets,
        unsettledBets: item.unsettledBets,
        profitLoss: item.profitLoss,
        totalLosers: item.totalLosers,
      }
    )))

  const tableInstance = useTable({ columns, data })

  console.log(tableInstance)


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


export default SystemTable;
