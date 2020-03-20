import React, { useState } from "react";
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Rule, FormItemProps } from "antd/lib/form";

import "./EditableTextForm.scss";
import _ from "lodash";

interface EditableTextFormProps {
  rules: Rule[];
  currentValue: string;
  children: (
    validateFields: () => void,
    toggleEditing: () => void
  ) => FormItemProps["children"];
  onSubmit: (newValue: string) => void;
}

/**
 * A generic editable text form.
 * Basically you define with what input method the text will be edited when in
 * edited mode.
 * The children will receive two function
 * validateFields: Call this function when you want to validate your fields and submit.
 * toggleEditing: Call this function when you want to exit editing mode.
 *
 * Please Notice:
 * Your input must have the props value and onChange.
 */
const EditableTextForm: React.FC<EditableTextFormProps> = ({
  children,
  rules,
  currentValue,
  onSubmit
}) => {
  const [editing, setEditing] = useState(false);
  const [form] = useForm();

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values.text);
        setEditing(false);
      })
      .catch(() => {});
  };

  return editing ? (
    <Form name={_.uniqueId("editable_text_form_")} form={form}>
      <Form.Item name="text" rules={rules}>
        {children(handleSubmit, toggleEditing)}
      </Form.Item>
    </Form>
  ) : (
    <span className="editable-field clickable" onClick={toggleEditing}>
      {currentValue}
    </span>
  );
};

export default EditableTextForm;
