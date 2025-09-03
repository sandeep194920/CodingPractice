import { useId, useState, type FC } from "react";
import type { AccordionT } from "../types";

const getAccordionHeaderId = (accordionId: string, value: string) => {
  return `${accordionId}--header--${value}`;
};

const getAccordionPanelId = (accordionId: string, value: string) => {
  return `${accordionId}--panel--${value}`;
};

interface AccordionProps {
  sections: Array<AccordionT>;
}

const Accordion: FC<AccordionProps> = ({ sections }) => {
  const [expanded, setExpanded] = useState(new Set<string>());
  const accordionId = useId();

  const toggleAccordion = (value: string) => {
    setExpanded((prev) => {
      /* DOESN'T WORK as we are not mutating the Set to re-render */

      //   if (prev.has(value)) {
      //     prev.delete(value);
      //   } else {
      //     prev.add(value);
      //   }

      //   return prev;

      /* WORKS as we are creating a new copy of set */
      const updatedValues = new Set(prev);

      //   I can't do ternary because delete or add doesnt return anything
      if (updatedValues.has(value)) {
        updatedValues.delete(value);
      } else {
        updatedValues.add(value);
      }

      return updatedValues;
    });
  };

  const focusOnSection = (index: number) => {
    document
      .getElementById(getAccordionHeaderId(accordionId, sections[index].value))
      ?.focus();
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    console.log("document.activeElement", document.activeElement);
    const activeItemValue = document.activeElement?.getAttribute(
      "data-accordion-value"
    );

    if (!activeItemValue) return;

    switch (event.code) {
      case "ArrowUp":
        {
          const index = sections.findIndex(
            ({ value: itemValue }) => itemValue === activeItemValue
          );
          focusOnSection((index - 1 + sections.length) % sections.length);
        }
        break;

      case "ArrowDown":
        {
          const index = sections.findIndex(
            ({ value: itemValue }) => itemValue === activeItemValue
          );

          focusOnSection((index + 1) % sections.length);
        }
        break;

      case "Home":
        focusOnSection(0);
        break;

      case "End":
        focusOnSection(sections.length - 1);
        break;
    }
  };

  return (
    <div className="accordion">
      <h4>Good accordion</h4>
      {sections.map((acc) => {
        const { value, contents, title } = acc;

        const headerId = getAccordionHeaderId(accordionId, value);
        const panelId = getAccordionPanelId(accordionId, value);

        return (
          <div className="accordion-item" key={value}>
            {/* ARIA requirement 1 - The button should be used which is a header of each accordion */}
            <button
              onKeyDown={handleKeydown}
              // Very important to add type (for ARIA purposes) because the default is submit.
              type="button"
              id={headerId} // this is related to aria-labelledby
              onClick={() => toggleAccordion(acc.value)}
              className="accordion-button"
              // ARIA requirement 2 - aria-expanded must be set to false or true based on content is visible or not
              aria-expanded={expanded.has(value)}
              // ARIA requirement 3 - aria-controls must be used on clickable element (header button) and aria-labelledby must be used in corresponding content.
              // They both must have same value - just like label and input in the form, where label has htmlFor prop and input has id prop referenced same

              // aria-controls={value}
              // this might conflict if another accordion is used on same page, hence using unique ID
              aria-controls={panelId} // controls panel-id
              // WAI requirement 1 - We can use data-accordion-value attribute that can be used when keydown to know if the keydown was
              // done on accordion header.
              data-accordion-value={value}
            >
              <span className="accordion-button__title">{title}</span>
              <span
                aria-hidden={true}
                className={`accordion-button__arrow ${
                  expanded.has(value) && "accordion-button__arrow--rotated"
                }`}
              />
            </button>
            <div
              // ARIA requirement 3 - role "region" and aria-labelledby must be put on the content. Look at point 3
              role="region"
              // aria-labelledby={value} // this might conflict if another accordion is used on same page, hence using unique ID
              aria-labelledby={headerId}
              id={panelId}
              hidden={!expanded.has(value)}
            >
              <p> {contents}</p>
            </div>
          </div>
        );
      })}
      <button>B</button>
    </div>
  );
};

export default Accordion;
