import { useState } from "react";
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
      <Modal
        open={showModal}
        onClose={handleModalClose}
        title="This is the heading"
      >
        <p>This is the modal content</p>
        <button onClick={() => setShowModal(false)}>Close Modal</button>
      </Modal>
    </>
  );
}

export default App;
