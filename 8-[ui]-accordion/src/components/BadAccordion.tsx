import { useState, type FC } from "react";

// First bad thing here is, isExpanded (state) is tightly coupled with data.

const initData = [
  {
    value: "html",
    title: "HTML",
    contents:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    isExpanded: false,
  },
  {
    value: "css",
    title: "CSS",
    contents:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    isExpanded: false,
  },
  {
    value: "javascript",
    title: "JavaScript",
    contents:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    isExpanded: false,
  },
];

const BadAccordion: FC = () => {
  const [accordion, setAccordion] = useState(initData);

  // This works, but this is bad because we are mapping all the values here everytime when a user clicks any specific accordion which is inefficient, O(n).
  // Instead we should find a way to open/close the selected accordion in o(1).
  const toggleAccordion = (selected: string) => {
    setAccordion((prev) =>
      // prev.map((acc) => {
      //   if (acc.value === selected) {
      //     return {
      //       ...acc,
      //       isExpanded: !acc.isExpanded,
      //     };
      //   }
      //   return acc;
      // })

      // OR can also be written concisely like this

      prev.map((acc) =>
        acc.value === selected ? { ...acc, isExpanded: !acc.isExpanded } : acc
      )
    );
  };

  /* Why this accordion is bad?
  
  - The state is defined within the data, so state and data are tightly coupled due to which data can't be used standalone
  - When an accordion is clicked, we map all accordions to determine if the state needs to be updated which is unnecessary and inefficient
  
  */

  return (
    <div className="accordion">
      <h4>Bad accordion</h4>
      {accordion.map((acc) => {
        const { value, contents, title, isExpanded } = acc;

        return (
          <div className="accordion-item" key={value}>
            <button
              onClick={() => toggleAccordion(acc.value)}
              className="accordion-button"
            >
              <span className="accordion-button__title">{title}</span>
              <span
                className={`accordion-button__arrow ${
                  isExpanded && "accordion-button__arrow--rotated"
                }`}
              />
            </button>
            {isExpanded && <p>{contents}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default BadAccordion;
