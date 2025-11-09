import "./App.css";
import type { House } from "./data/houses";
import houses from "./data/houses";
import users, { type User } from "./data/users";
import DataTable from "./DataTable";

export type SortDirection = "asc" | "desc";

export interface Column<T> {
  label: string;
  key: keyof T;
  comparator: (a: T, b: T, sortDirection: SortDirection) => number;
  renderCell: (row: T) => React.ReactNode;
}

const userColumns: Array<Column<User>> = [
  {
    label: "Id",
    key: "id",
    comparator: (a: User, b: User, sortDirection: SortDirection) =>
      sortDirection === "asc" ? a.id - b.id : b.id - a.id,
    renderCell: (row: User) => row.id,
  },

  {
    label: "Name",
    key: "name",
    comparator: (a: User, b: User, sortDirection: SortDirection) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    renderCell: (row: User) => row.name,
  },
  {
    label: "Age",
    key: "age",
    comparator: (a: User, b: User, sortDirection: SortDirection) =>
      sortDirection === "asc" ? a.age - b.age : b.age - a.age,
    renderCell: (row: User) => row.age,
  },

  {
    label: "Occupation",
    key: "occupation",
    comparator: (a: User, b: User, sortDirection: SortDirection) =>
      sortDirection === "asc"
        ? a.occupation.localeCompare(b.occupation)
        : b.occupation.localeCompare(a.occupation),
    renderCell: (row: User) => row.occupation,
  },
] as const;

const houseColumns: Array<Column<House>> = [
  {
    label: "Id",
    key: "id",
    comparator: (a: House, b: House, sortDirection: SortDirection) =>
      sortDirection === "asc" ? a.id - b.id : b.id - a.id,
    renderCell: (row: House) => row.id,
  },

  {
    label: "Street",
    key: "street",
    comparator: (a: House, b: House, sortDirection: SortDirection) =>
      sortDirection === "asc"
        ? a.street.localeCompare(b.street)
        : b.street.localeCompare(a.street),
    renderCell: (row: House) => row.street,
  },

  {
    label: "City",
    key: "city",
    comparator: (a: House, b: House, sortDirection: SortDirection) =>
      sortDirection === "asc"
        ? a.city.localeCompare(b.city)
        : b.city.localeCompare(a.city),
    renderCell: (row: House) => row.city,
  },

  {
    label: "State",
    key: "state",
    comparator: (a: House, b: House, sortDirection: SortDirection) =>
      sortDirection === "asc"
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state),
    renderCell: (row: House) => row.state,
  },

  {
    label: "Zip",
    key: "zip",
    comparator: (a: House, b: House, sortDirection: SortDirection) =>
      sortDirection === "asc"
        ? a.zip.localeCompare(b.zip)
        : b.zip.localeCompare(a.zip),
    renderCell: (row: House) => row.zip,
  },

  {
    label: "Built year",
    key: "built_year",
    comparator: (a: House, b: House, sortDirection: SortDirection) =>
      sortDirection === "asc"
        ? a.built_year - b.built_year
        : b.built_year - a.built_year,
    renderCell: (row: House) => row.built_year,
  },
];

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        marginLeft: "2rem",
      }}
    >
      <DataTable data={users} columns={userColumns} />
      <DataTable data={houses} columns={houseColumns} />
    </div>
  );
}

export default App;
