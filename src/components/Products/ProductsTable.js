import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProductsData } from "../../store/products-actions";
import { productActions } from "../../store/products-slice";

import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
  useRowSelect,
} from "react-table";
import Checkbox from "./Checkbox";
import { COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";
import "./table.css";

const divStyle = {
  overflowX: "scroll",
};

const ProductsTable = () => {
  const dispatch = useDispatch();
  const MOCK_DATA = useSelector((state) => state.products.items);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, [MOCK_DATA]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const removeProductHandler = () => {
    const ids = selectedFlatRows.map((product) => product.values.id);
    dispatch(removeProductsData(ids, data));

    if (ids[0] === undefined) {
      alert("You should choose item first");
      return;
    }
  };

  const editProductHandler = () => {
    const products = selectedFlatRows.map((product) => product.values);

    if (products.length > 1) {
      alert("You can only edit one item at a time");
      return;
    }

    if (products[0] === undefined) {
      alert("You should choose item first");
      return;
    }

    dispatch(productActions.editProductOn(products[0]));
  };

  const addNewProductHandler = () => {
    console.log("New product");
  };

  return (
    <div style={divStyle}>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ⬇️"
                        : " ⬆️"
                      : ""}
                  </span>
                  {/* If You uncomment this line of code below
                  You will get posibility to search by columns
                  I hid it because it disturbed my design 
                  but it is a feature that works */}
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="options-bar">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="first-btn"
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="prev-btn"
        >
          Previous
        </button>
        <span>
          {"  "}Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
          {"  "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
            className="go-to-page"
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="how-many-products"
        >
          {[10, 20, 40, 80].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="next-btn"
        >
          Next
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="last-btn"
        >
          {">>"}
        </button>{" "}
        <button onClick={removeProductHandler} className="delete-btn">
          Delete Product
        </button>{" "}
        <button onClick={editProductHandler} className="edit-btn">
          Edit Product
        </button>
        <button onClick={addNewProductHandler} className="add-new-btn">
          Add New Product
        </button>
      </div>
      {/* If You will uncomment this block of code from below
            You will be see under the table, what elements have you just selected */}
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
};

export default ProductsTable;
