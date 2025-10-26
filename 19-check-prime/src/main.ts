import "./style.css";
import * as primeCheck from "./primeCheck.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>Check if the number is prime or not</h1>
   <p>Hint - Check till sqrt
  </div>
`;
