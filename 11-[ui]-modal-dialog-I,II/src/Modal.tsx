import { useId, type FC, type PropsWithChildren } from "react";
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

  if (!open) return null; // LOOK AT README.md for notes on hidden

  const modalContent = (
    <section
      // Aria lables
      aria-modal="true" // can also be just aria-modal (omit the = true)
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={contentId}
      className="modal__backdrop"
      onClick={onClose}
    >
      <article className="modal__content">
        <h1 id={titleId}>{title}</h1>
        <span id={contentId}>{children}</span>
      </article>
    </section>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
