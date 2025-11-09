import "./App.css";
import type { House } from "./data/houses";
import houses from "./data/houses";
import users, { type User } from "./data/users";
import DataTable from "./DataTable";

interface Column<T> {
  label: string;
  key: keyof T;
}

const userColumns: Array<Column<User>> = [
  { label: "Id", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Occupation", key: "occupation" },
] as const;

const houseColumns: Array<Column<House>> = [
  { label: "Id", key: "id" },
  { label: "Street", key: "street" },
  { label: "City", key: "city" },
  { label: "State", key: "state" },
  { label: "Zip", key: "zip" },
  { label: "Built year", key: "built_year" },
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
