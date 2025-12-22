import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { flatten1, flatten2 } from "./flatten.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Flatten Array</h2>
  </div>
`;
