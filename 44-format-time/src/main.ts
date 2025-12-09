import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { formatTime } from "./formatTime.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   
    <h1>Format Time</h1>
 
    <p class="read-the-docs">
      Convert given time in milliseconds into hours, minutes, seconds and milliseconds format
    </p>
  </div>
`;
