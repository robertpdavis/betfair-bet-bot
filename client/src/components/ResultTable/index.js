import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";


function ResultTable({ resultData }) {

  const data = resultData.results;

  const columns = useMemo(
    () => [
      {
        Header: "Bet Placed",
        accessor: "betPlaced",
      },
      {
        Header: "Event Name",
        accessor: "eventName"
      },
      {
        Header: "Market Name",
        accessor: "marketName"
      },
      {
        Header: "Selection Name",
        accessor: "selectionName"
      },
      {
        Header: "Order Type",
        accessor: "orderType"
      },
      {
        Header: "Order Status",
        accessor: "orderStatus"
      },
      {
        Header: "Bet Type",
        accessor: "betType"
      },
      {
        Header: "Bet Outcome",
        accessor: "betOutcome"
      },
      {
        Header: "Price Matched",
        accessor: "priceMatched"
      },
      {
        Header: "Size Matched",
        accessor: "sizeMatched"
      },
      {
        Header: "Bet Liability",
        accessor: "liability"
      },
      {
        Header: "Profit/Loss",
        accessor: "profitLoss"
      },
      {
        Header: "Status",
        accessor: "betStatus"
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
  },
    usePagination
  )

  if (data.length > 0) {
    return (
      <div className="table-responsive">
        <table className="table table-sm text-center dashboard-table"  {...getTableProps()}>
          <thead className="bg-dark text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, c) => {

                    if (cell.column.id === 'betPlaced') {
                      return <td {...cell.getCellProps()}><Link to={"/result/" + row.original._id}>{new Date(cell.value).toLocaleString()}</Link></td>
                    }

                    if (cell.column.id === 'betOutcome') {
                      if (cell.value === 'Win') {
                        return <td {...cell.getCellProps()}><span className="badge bg-success">{cell.value}</span></td>
                      } else {
                        return <td {...cell.getCellProps()}><span className="badge bg-warning">{cell.value}</span></td>
                      }
                    }

                    if (cell.column.id === 'priceMatched' || cell.column.id === 'sizeMatched' || cell.column.id === 'liability' || cell.column.id === 'profitLoss') {
                      return <td {...cell.getCellProps()}>{(cell.value / 100).toFixed(2)}</td>
                    }

                    if (cell.column.id === 'betStatus') {
                      if (cell.value === 'Open') {
                        return <td {...cell.getCellProps()}><span className="badge bg-success">{cell.value}</span></td>
                      } else {
                        return <td {...cell.getCellProps()}><span className="badge bg-secondary">{cell.value}</span></td>
                      }
                    }
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination pagination-sm dashboard-table">

          <button className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          <button className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span className="d-inline-block align-middle">
            &nbsp;Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span className="align-top">
            &nbsp;| Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              min="1"
              max={pageOptions.length}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '50px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  } else {
    return (<h5>There are no current results for this system.</h5>);
  }
}


export default ResultTable;