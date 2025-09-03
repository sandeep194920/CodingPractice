import "./App.css";
import Accordion from "./components/Accordion";
import BadAccordion from "./components/BadAccordion";
import type { AccordionT } from "./types";

const sections: AccordionT[] = [
  {
    value: "html",
    title: "HTML",
    contents:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    value: "css",
    title: "CSS",
    contents:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
  },
  {
    value: "javascript",
    title: "JavaScript",
    contents:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
  },
];

function App() {
  return (
    <div className="wrapper">
      <BadAccordion />
      <Accordion sections={sections} />
    </div>
  );
}

export default App;
