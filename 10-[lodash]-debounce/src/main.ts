import "./style.css";
import { debounce } from "./debounce.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Debounce</h1>
    <button id="btn" type="button">Debounce Click</button>
  </div>
`;

const btn = document.getElementById("btn");

const buttonClick = function (this: any, msg: string) {
  console.log("Button clicked by", this, msg);
};

const debouncedClick = debounce(buttonClick, 1000);

// btn?.addEventListener("click", debouncedClick);

function debouncedClickWithArgs(this: any) {
  debouncedClick.call(this, "Hey there");
}

btn?.addEventListener("click", debouncedClickWithArgs);
