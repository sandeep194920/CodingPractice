import * as fib from "./fibinocci.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Fibinocci</h2>
    <br/>
    <p>This contains the following:</p>
    <ol>
      <li>Find fibinocci number through recursion</li>
      <li>Find fibinocci number through loops</li>
      <li>Optimize the above</li>
      <li>Function to generate fibinocci series (not just return the number but return back the whole series)</li>
      <li>Function to generate fibinocci tree that prints the above generated sequence into number of rows the user wants</li>

      <h3>Look at concole logs please</h3>
    </ol>
  </div>
`;
