import { useState, type FC } from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <ModalDialog showModal={showModal} handleModalClose={handleModalClose} />
    </>
  );
}

export default App;

interface ModalDialogProps {
  showModal: boolean;
  handleModalClose: VoidFunction;
}

/* 
Why did we switch from 

App => Modal [that has (!open) return null]

to 

App => ModalDialog [that has (!open) return null] => Modal

Refer README.md
*/

const ModalDialog: FC<ModalDialogProps> = ({ showModal, handleModalClose }) => {
  if (!showModal) return null;

  return (
    <Modal onClose={handleModalClose} title="This is the heading">
      <div className="modal-dialog">
        <input
          type="text"
          placeholder="this should get focused first by default when modal opens"
        />
        <textarea></textarea>
        <button onClick={handleModalClose}>Submit</button>
        <button type="button" onClick={handleModalClose}>
          Close Modal
        </button>
      </div>
    </Modal>
  );
};
