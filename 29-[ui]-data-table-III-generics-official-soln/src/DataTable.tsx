import { useState } from "react";
import type { Column, SortDirection } from "./App";

interface DataTableProps<T> {
  data: T[]; // [{id:number, name:string, age:number}]
  columns: Column<T>[]; // T is {id:number, name:string, age:number} and keyof T will be id or name or age. Note it will still infer it as stirng | number | symbol
}

type SortField<T> = keyof T;

const paginate = <T,>(data: T[], page: number, pageSize: number) => {
  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize; // page - 1 assuming page number starts from 1.
  const end = start + pageSize;
  const pageData = data.slice(start, end);

  return { totalPages, pageData };
};

const sortData = <T,>(
  data: T[],
  columns: Column<T>[],
  field: SortField<T> | null,
  direction: SortDirection
) => {
  const dataClone = data.slice();

  // if (field === null) return dataClone;

  // return dataClone.sort((a, b) => {
  //   const aVal = a[field];
  //   const bVal = b[field];

  //   if (typeof aVal === "string" && typeof bVal === "string")
  //     return direction === "asc"
  //       ? aVal.localeCompare(bVal)
  //       : bVal.localeCompare(aVal);

  //   if (typeof aVal === "number" && typeof bVal === "number")
  //     return direction === "asc" ? aVal - bVal : bVal - aVal;

  //   // default - not sorted
  //   return 0;
  // });

  const comparator = columns.find((col) => col.key === field)?.comparator;

  if (comparator == null) return dataClone;

  return dataClone.sort((a, b) => comparator(a, b, direction));
};

function DataTable<T extends { id: number }>({
  data,
  columns,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState<SortField<T> | null>(null);

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedUsers = sortData(data, columns, sortField, sortDirection);

  const { totalPages, pageData } = paginate(sortedUsers, page, pageSize);

  // Default sort applied on pageData

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th key={key as string}>
                <button
                  onClick={() => {
                    if (sortField !== key) {
                      setSortField(key);
                      setSortDirection("asc");
                    } else {
                      setSortDirection((prev) =>
                        prev === "asc" ? "desc" : "asc"
                      );
                    }
                    setPage(1);
                  }}
                >
                  {label}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {pageData.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))} */}

          {/* {pageData.map((row) => (
            <tr key={row.id}>
              {Object.entries(row).map(([key, val]) => (
                <td key={key}>{val}</td>
              ))}
            </tr>
          ))} */}

          {pageData.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key as string}>{col.renderCell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <div className="pagination">
        <select
          aria-label="Page Size"
          onChange={(e) => {
            setPageSize(+e.target.value);
            setPage(1);
          }}
        >
          {[5, 10, 15].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>

        <div className="pages">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span aria-label="Page Number">
            {page} Of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
