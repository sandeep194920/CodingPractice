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

const paginate = (data: User[], page: number, pageSize: number) => {
  // return -> total pages, pageData

  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize; // page - 1 assuming page number starts from 1.
  const end = start + pageSize;

  const pageData = data.slice(start, end);

  return { totalPages, pageData };
};

const DataTable: FC<DataTableProps> = ({ users }) => {
  const [page, setPage] = useState(4);
  const [pageSize, setPageSize] = useState(10);

  const { totalPages, pageData } = paginate(users, page, pageSize);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>{label}</th>
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
