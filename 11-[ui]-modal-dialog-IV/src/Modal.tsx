import {
  useEffect,
  useId,
  useRef,
  type FC,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: VoidFunction;
  title: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  onClose,
  children,
  title,
}) => {
  const titleId = useId();
  const contentId = useId();

  const dialogRef = useRef<HTMLElement>(null);

  useOnKeyDown("Escape", onClose);
  useOnClickOutside(dialogRef, onClose);

  // if (!open) return null; // Not required

  // Modal IV hooks

  /* Here the active element will be the button that opened the modal as there's nothing focused inside the modal yet. 
  However, if u call the useFocusOnFirstTabbableElement hook before this, then useFocusOnFirstTabbableElement will focus on first element 
  and then when this hook runs it would focus on first element inside the modal which loses focus to the button that opened it */
  useReturnFocusToTrigger();
  useFocusFirstTabbableElement(dialogRef);
  useFocusTrap(dialogRef);

  const modalContent = (
    <section
      // Aria lables
      aria-modal="true" // can also be just aria-modal (omit the = true)
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={contentId}
      className="modal__backdrop"
    >
      <article ref={dialogRef} className="modal__content">
        <h1 id={titleId}>{title}</h1>
        <span id={contentId}>{children}</span>
      </article>
    </section>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;

// Hooks

/* 
Invokes the callback function when key is pressed 
*/
const useOnKeyDown = (key: string, callback: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === key) callback(e);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [key, callback]);
};

/* 
Invokes the callback function when clicked outside the dialogRef
*/

const useOnClickOutside = (
  dialogRef: RefObject<HTMLElement | null>,
  callback: VoidFunction
) => {
  useEffect(() => {
    const clickOutside = (e: MouseEvent | TouchEvent) => {
      /* 
dialogRef.current.contains(e.target) is what we need to check, but for this to be true, dialogRef.current must be an instance of Node and also not be null, 
hence we have 3 conditions here
*/

      if (
        e.target instanceof Node &&
        dialogRef.current !== null &&
        !dialogRef.current.contains(e.target)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", clickOutside);
    document.addEventListener("touchstart", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("touchstart", clickOutside);
    };
  }, [dialogRef, callback]);
};

/* ************************************************************ */

/* Utilitlity functions for hooks */

/* getTabbableElements -> gets all elements that are tabbable inside a given area like modal dialog (which can be referenced using ref)  
This returns NodeList (not an array actually) because of which we need to check if returned element here is an instance of HTMLElement in order to do the focus().
*/
const getTabbableElements = (elRef: RefObject<HTMLElement | null>) => {
  // checking for null or undefined using == null.
  if (elRef.current == null) return [];

  // Node list of all tabbable elements (note that it's not array because querySelectorAll returns node list)
  return elRef.current.querySelectorAll(
    "button, [href], select, input, textarea, [tabIndex]:not([tabIndex='-1'])" // there can be many more like button:not([disabled]) -> look at readme
  );
};

/* Modal IV hooks */

/* 
useReturnFcusToTrigger -> Open modal using tab press (Enter or space on button once focused). Press Escape and then you should see the button should still be focused once the modal closes
This should be used before useFocusFirstTabbableElement in the above code because, we use document.activeElement inside useReturnFocusToTrigger which points to button rather than first tab element that is done inside useFocusFirstTabbableElement
*/
const useReturnFocusToTrigger = () => {
  // normal variable like let triggerElement = null doesnt work because it might be lost during render cycles. useRef doesnt lose values across render cycles
  const triggerElement = useRef<Element | null>(null); // this is the button that triggers before opening the modal. Since there's no keydown event that is listened on unlike in useFocusTrap, we can be sure that document.activeElement doesnt change to other element when tabbed

  // cleanup function that's executed when modal is closed (when the component gets unmounted)
  // at the time, the focus is given back to triggerElement
  useEffect(() => {
    triggerElement.current = document.activeElement;

    return () => {
      /* document.activeElement could be any Node, not just HTML element. But the focus() is possible if the node actually is an HTML element, hence doing this check */
      if (
        triggerElement.current instanceof HTMLElement &&
        triggerElement.current != null
      ) {
        triggerElement.current.focus();
      }
    };
  }, []);
};

/* 
useFocusFirstTabbableElement -> Focuses on first tabbable element when the modal gets opened
*/
const useFocusFirstTabbableElement = (elRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const allTabbableElements = getTabbableElements(elRef); // This should exist inside useEffect. Look at readme #### 7
    const [firstTabbableElement] = allTabbableElements;

    if (firstTabbableElement instanceof HTMLElement)
      firstTabbableElement.focus();
  }, [elRef]);
};

/* 
useFocusTrap -> By tabbing or shift tabbing, the focus should be within the modal boundaries and must not go out until the modal is closed
*/
const useFocusTrap = (el: RefObject<HTMLElement | null>) => {
  const trapFocus = (e: KeyboardEvent) => {
    if (el.current === null) return;

    const getAllTabbedElements = getTabbableElements(el);

    const firstElement = getAllTabbedElements[0];
    const lastElement = getAllTabbedElements[getAllTabbedElements.length - 1];

    console.log("active element", document.activeElement);
    console.log("first", firstElement);
    console.log("last", lastElement);

    // e.shiftKey = true if it is shift tab
    if (e.shiftKey) {
      if (
        firstElement === document.activeElement && // document.activeElement changes here due to keydown event listening that happens inside useOnKeyDown
        lastElement instanceof HTMLElement
      ) {
        e.preventDefault(); // Very important because the browser tries to focus on an element and we are overriding it with our .focus(), so if we comment this line then browser focus and our focus will cause it to skip first and last elements
        lastElement.focus();
      }
    } else {
      if (
        lastElement === document.activeElement &&
        firstElement instanceof HTMLElement
      ) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  useOnKeyDown("Tab", trapFocus); // this will also work for shift + Tab

  //   useEffect(() => {
  //   function onKeyDown(e: KeyboardEvent) {
  //     if (e.key === key) callback();
  //   }
  //   document.addEventListener("keydown", onKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", onKeyDown);
  //   };
  // }, [key, callback]);
};
