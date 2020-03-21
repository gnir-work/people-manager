import React, { useState } from "react";
import { Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Rule, FormItemProps } from "antd/lib/form";
import _ from "lodash";
import classNames from "classnames";

import "./EditableTextForm.scss";

interface EditableTextFormProps {
  rules: Rule[];
  currentValue: string;
  children: (
    submitForm: () => void,
    toggleEditing: () => void
  ) => FormItemProps["children"];
  onSubmit: (newValue: string) => void;
  textClassName?: string;
}

/**
 * A generic component for editing text.
 * The component expects to receive the input method (For example <Input> or <AutoComplete>) as
 * its children (See the props interface).
 * The children receive two functions in order to allow more control over the form from the inputs element side:
 * 1. submitForm - When this function is called the form will be validated and submitted.
 * 2. toggleEditing - Calling this function will toggle the editing state of the form, please note that submitForm already closes the editor.
 *
 * Please Notice:
 * Your input must have the props value and onChange.
 */
const EditableTextForm: React.FC<EditableTextFormProps> = ({
  children,
  rules,
  currentValue,
  onSubmit,
  textClassName
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
    <Form
      initialValues={{ text: currentValue }}
      name={_.uniqueId("editable_text_form_")}
      form={form}
    >
      <Form.Item name="text" rules={rules}>
        {children(handleSubmit, toggleEditing)}
      </Form.Item>
    </Form>
  ) : (
    <span
      className={classNames(textClassName, "editable-field clickable")}
      onClick={toggleEditing}
    >
      {currentValue}
    </span>
  );
};

export default EditableTextForm;
