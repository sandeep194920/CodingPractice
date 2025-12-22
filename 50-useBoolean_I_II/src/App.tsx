import { useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const { value, setTrue, setFalse } = useBoolean();

  console.log({ value, setTrue, setFalse });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

function useBoolean(initialValue?: boolean): UseBooleanReturn {
  const [value, setValue] = useState(!!initialValue);

  const setTrue = useCallback(() => {
    return setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    return setValue(false);
  }, []);

  return {
    value,
    setTrue,
    setFalse,
  };
}
