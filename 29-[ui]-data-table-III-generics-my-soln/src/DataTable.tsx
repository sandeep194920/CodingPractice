import { useState } from "react";

type ColumnT<T> = {
  label: string;
  key: T; // T here is actually keyof T that is passed into this from interface DataTableProps<T>
};

interface DataTableProps<T> {
  //{id:number, name:string, age:number}
  data: T[]; // [{id:number, name:string, age:number}]
  // columns: {
  //   label:string;
  //   key: keyof T
  // }

  columns: ColumnT<keyof T>[]; // T is {id:number, name:string, age:number} and keyof T will be id or name or age. Note it will still infer it as stirng | number | symbol
}

// interface Column {
//   label: string;
//   key: keyof User;
// }

// const columns: Array<Column> = [
//   { label: "Id", key: "id" },
//   { label: "Name", key: "name" },
//   { label: "Age", key: "age" },
//   { label: "Occupation", key: "occupation" },
// ] as const;

type SortField<T> = keyof T;

type SortDirection = "asc" | "desc";

const paginate = <T,>(data: T[], page: number, pageSize: number) => {
  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize; // page - 1 assuming page number starts from 1.
  const end = start + pageSize;

  const pageData = data.slice(start, end);

  return { totalPages, pageData };
};

const sortData = <T,>(
  data: T[],
  field: SortField<T> | null,
  direction: SortDirection
) => {
  const dataClone = data.slice();

  if (field === null) return dataClone;

  return dataClone.sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === "string" && typeof bVal === "string")
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);

    if (typeof aVal === "number" && typeof bVal === "number")
      return direction === "asc" ? aVal - bVal : bVal - aVal;

    // default - not sorted
    return 0;
  });
};

type DataTableRecord = { id: number };

function DataTable<T extends DataTableRecord>({
  data,
  columns,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState<SortField<T> | null>(null);

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedUsers = sortData(data, sortField, sortDirection);

  const { totalPages, pageData } = paginate(sortedUsers, page, pageSize);

  // Default sort applied on pageData

  return (
    <div>
      <table>
        <thead>
          {/* <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>
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
          </tr> */}

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

          {pageData.map((column) => (
            <tr key={column.id}>
              {Object.entries(column).map(([key, val]) => (
                <td key={key}>{val}</td>
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
