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
  open: boolean;
  onClose: VoidFunction;
  title: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
  title,
}) => {
  const titleId = useId();
  const contentId = useId();

  const dialogRef = useRef<HTMLElement>(null);

  useOnKeyDown("Escape", onClose);
  useOnClickOutside(dialogRef, onClose);

  if (!open) return null; // LOOK AT README.md for notes on hidden

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
const useOnKeyDown = (key: string, callback: VoidFunction) => {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === key) callback();
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
