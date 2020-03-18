import React, { useState } from "react";
import AddButton from "../actions/AddButton";
import { Modal } from "antd";

const AddPersonModal: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const addPerson = () => {
    hideModal();
  };

  return (
    <>
      <AddButton onClick={showModal} />
      <Modal visible={visible} onCancel={hideModal} onOk={addPerson}>
        <h1>I am a modal!</h1>
      </Modal>
    </>
  );
};

export default AddPersonModal;
