import { useState, type FC } from "react";
import type { User } from "./data/users";

interface DataTableProps {
  users: User[];
}

interface Column {
  label: string;
  key: keyof User;
}

const columns: Array<Column> = [
  { label: "Id", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Occupation", key: "occupation" },
] as const;

type SortField = keyof User;

type SortDirection = "asc" | "desc";

const paginate = (data: User[], page: number, pageSize: number) => {
  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize; // page - 1 assuming page number starts from 1.
  const end = start + pageSize;

  const pageData = data.slice(start, end);

  return { totalPages, pageData };
};

const sortUsers = (
  userList: User[],
  field: SortField | null,
  direction: SortDirection
) => {
  const usersClone = userList.slice(); // or [...usersList]

  switch (field) {
    case "name":
    case "occupation":
      return usersClone.sort((a, b) =>
        direction === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field])
      );
    case "id":
    case "age":
      return usersClone.sort((a, b) =>
        direction === "asc" ? a[field] - b[field] : b[field] - a[field]
      );
    default:
      return usersClone;
  }
};

const DataTable: FC<DataTableProps> = ({ users }) => {
  const [page, setPage] = useState(4);
  const [pageSize, setPageSize] = useState(10);

  const [sortField, setSortField] = useState<SortField | null>(null);

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedUsers = sortUsers(users, sortField, sortDirection);

  const { totalPages, pageData } = paginate(sortedUsers, page, pageSize);

  // Default sort applied on pageData

  return (
    <div>
      <table>
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {pageData.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
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
};

export default DataTable;
