import React, { useMemo, useEffect, useRef, forwardRef } from "react";
import { useTable, useRowSelect } from "react-table";
import { Link } from "react-router-dom";;


function SystemTable({ systemData, setSelection }) {

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "systemId",
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
    () => systemData.map((item) => (
      {
        _id: item._id,
        systemId: item.systemId,
        title: item.title,
        isActive: (item.isActive ? 'Active' : 'Stopped'),
        mode: item.mode,
        betType: item.betType,
        totalEvents: item.totalEvents,
        totalMarkets: item.totalMarkets,
        totalBets: item.totalBets,
        unsettledBets: item.unsettledBets,
        profitLoss: (item.profitLoss / 100).toFixed(2),
        totalLosers: item.totalLosers,
      }
    )),
    []
  );

  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef()
      const resolvedRef = ref || defaultRef

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable({
    columns,
    data
  },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Add a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  );

  React.useEffect(() => {
    if (selectedFlatRows) {
      setSelection(selectedFlatRows)
    } else {
      setSelection('')
    }
  }, [selectedRowIds])

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm text-center dashboard-table" {...getTableProps()}>
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
          {rows.slice(0, 10).map((row, i) => {
            let link = "/system/" + data[i]._id
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, c) => {
                  if (c === 1) {
                    return <td {...cell.getCellProps()}><Link to={link}>{cell.render("Cell")}</Link></td>;
                  }
                  if (cell.value === 'Active') {
                    return <td {...cell.getCellProps()}><span className="badge bg-success">{cell.render("Cell")}</span></td>;
                  } else if (cell.value === 'Stopped') {
                    return <td {...cell.getCellProps()}><span className="badge bg-secondary">{cell.render("Cell")}</span></td>;
                  } else {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SystemTable;
