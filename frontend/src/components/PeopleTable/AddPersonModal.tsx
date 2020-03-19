import React, { useState } from "react";
import AddButton from "../actions/AddButton";
import { Modal, Button, Form } from "antd";

const AddPersonModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

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
      <Modal
        title="הוספת איש חוץ"
        visible={visible}
        onCancel={hideModal}
        onOk={addPerson}
        footer={[
          <Button key="back" onClick={hideModal}>
            ביטול
          </Button>,
          <Button key="submit" type="primary" onClick={addPerson}>
            הוספה
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        ></Form>
      </Modal>
    </>
  );
};

export default AddPersonModal;
