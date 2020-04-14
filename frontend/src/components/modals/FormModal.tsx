import React, { useState, KeyboardEvent, ReactNode } from "react";
import AddButton from "../actions/AddButton";
import { Modal, Form, message } from "antd";
import { FormInstance } from "antd/lib/form";
import { AxiosError } from "axios";

export interface ChildrenFunction {
  onEnter: (event: KeyboardEvent<HTMLFormElement>) => void;
  form: FormInstance;
}

interface FormModalProps {
  onSubmit: (values: Object) => Promise<void>;
  children: (params: ChildrenFunction) => ReactNode;
  title: string;
}

const FormModal: React.FC<FormModalProps> = ({ onSubmit, children, title }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleEnter = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      submitModal();
    }
  };

  const submitModal = () => {
    form.validateFields().then(values => {
      onSubmit(values as any)
        .then(() => {
          form.resetFields();
          message.success("הטופס הוגש בהצלחה");
          hideModal();
        })
        .catch(error => {
          if (error.response?.status === 409) {
            message.error("כבר קיימת רשומה כזו");
          } else {
            message.error("היית שגיאה");
          }
        });
    });
  };

  return (
    <>
      <AddButton onClick={showModal} />
      <Modal
        onOk={submitModal}
        title={title}
        visible={visible}
        onCancel={hideModal}
        okText="הוספה"
        cancelText="ביטול"
      >
        {children({ form, onEnter: handleEnter })}
      </Modal>
    </>
  );
};

export default FormModal;
