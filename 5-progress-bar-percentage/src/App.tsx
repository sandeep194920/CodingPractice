import "./App.css";
import ProgressBar from "./components/ProgressBar";

const App = () => {
  return (
    <section className="p-20 gap-10 flex flex-col">
      <ProgressBar progress={80} />
      <ProgressBar progress={25} />
      <ProgressBar progress={50} />
      <ProgressBar progress={-20} />
      <ProgressBar progress={100} />
      <ProgressBar progress={120} />
    </section>
  );
};

export default App;
