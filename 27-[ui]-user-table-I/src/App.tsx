import "./App.css";
import users from "./data/users";
import DataTable from "./DataTable";

function App() {
  return <DataTable users={users} />;
}

export default App;
