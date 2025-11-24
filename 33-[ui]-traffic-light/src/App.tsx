import "./App.css";
import TrafficLight from "./TrafficLight";

export type Color = "red" | "green" | "yellow";

export type Config = Record<
  Color,
  {
    duration: number;
    next: Color;
    backgroundColor: string;
  }
>;

const config: Config = {
  red: {
    duration: 2000,
    next: "green",
    backgroundColor: "red",
  },
  yellow: {
    duration: 2000,
    next: "red",
    backgroundColor: "yellow",
  },
  green: {
    duration: 3000,
    next: "yellow",
    backgroundColor: "green",
  },
};

function App() {
  return (
    <div className="wrapper">
      <TrafficLight config={config} />
      <TrafficLight config={config} layout="horizontal" />
    </div>
  );
}

export default App;
