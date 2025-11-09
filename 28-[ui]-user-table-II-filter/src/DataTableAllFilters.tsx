import { useState, type FC } from "react";
import type { User } from "./data/users";

interface DataTableProps {
  users: User[];
}

interface Column {
  label: string;
  key: keyof User;
}

interface Filter {
  name: string;
  occupation: string;
  age: {
    min: string;
    max: string;
  };
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

const getFilteredUsers = (filter: Filter, users: User[]) => {
  return users.filter((user) => {
    const matchesName =
      filter.name === "" ||
      user.name.toLowerCase().includes(filter.name.toLowerCase());

    const matchesOccupation =
      filter.occupation === "" ||
      user.occupation.toLowerCase().includes(filter.occupation.toLowerCase());

    const matchesMinAge = filter.age.min === "" || user.age >= +filter.age.min;
    const matchesMaxAge = filter.age.max === "" || user.age <= +filter.age.max;

    // We keep this user if all of these conditions match
    return matchesName && matchesOccupation && matchesMinAge && matchesMaxAge;
  });
};

const DataTableAllFilters: FC<DataTableProps> = ({ users }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState<Filter>({
    name: "",
    occupation: "",
    age: {
      min: "",
      max: "",
    },
  });

  const filteredUsers = getFilteredUsers(filters, users);

  const { totalPages, pageData } = paginate(filteredUsers, page, pageSize);

  const handleInputChange = (
    field: Exclude<keyof User, "age" | "id">,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setPage(1);
  };

  const handleAgeChange = (field: "min" | "max", value: string) => {
    setFilters((prev) => ({
      ...prev,
      age: {
        ...prev.age,
        [field]: value,
      },
    }));
    setPage(1);
  };

  const renderInput = (key: keyof User) => {
    switch (key) {
      case "name":
        return (
          <input
            type="search"
            value={filters.name}
            // onChange={(e) => {
            //   setFilters((prev) => ({
            //     ...prev,
            //     name: e.target.value,
            //   }));
            //   setPage(1);
            // }}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        );

      case "occupation":
        return (
          <input
            type="search"
            value={filters.occupation}
            // onChange={(e) => {
            //   setFilters((prev) => ({
            //     ...prev,
            //     occupation: e.target.value,
            //   }));
            //   setPage(1);
            // }}

            onChange={(e) => handleInputChange("occupation", e.target.value)}
          />
        );

      case "age":
        return (
          <div className="age-input">
            <input
              type="search"
              value={filters.age.min}
              //   onChange={(e) => {
              //     setFilters((prev) => ({
              //       ...prev,
              //       age: {
              //         ...prev.age,
              //         min: e.target.value,
              //       },
              //     }));
              //     setPage(1);
              //   }}
              onChange={(e) => handleAgeChange("min", e.target.value)}
            />
            <input
              type="search"
              value={filters.age.max}
              //   onChange={(e) => {
              //     setFilters((prev) => ({
              //       ...prev,
              //       age: {
              //         ...prev.age,
              //         max: e.target.value,
              //       },
              //     }));
              //     setPage(1);
              //   }}
              onChange={(e) => handleAgeChange("max", e.target.value)}
            />
          </div>
        );

      case "id":
      default:
        break;
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr className="table-row-heading">
            {columns.map(({ label, key }) => (
              <th key={key}>
                <div className="table-head">
                  <span>{label}</span>
                  {renderInput(key)}
                </div>
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

export default DataTableAllFilters;
