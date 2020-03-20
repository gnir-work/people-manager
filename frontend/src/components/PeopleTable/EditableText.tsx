import React, { useContext, useState } from "react";
import { message, Input, Form } from "antd";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import "./EditableText.scss";
import { EDIT_SUCCESS_MESSAGE } from "../../consts";
import { useForm } from "antd/lib/form/util";
import { Rule } from "antd/lib/form";

interface PeopleTableEditableTextProps {
  initialValue: string;
  field: ConditionalProps<Person, string>;
  person: Person;
  rules?: Rule[];
}

const EditableText: React.FC<PeopleTableEditableTextProps> = ({
  field,
  person,
  initialValue,
  rules = []
}) => {
  const [editing, setEditing] = useState(false);
  const { updatePerson } = useContext(PeopleContext);
  const [form] = useForm();

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleTextChange = () => {
    form.validateFields().then(values => {
      updatePerson({ ...person, [field]: values.text });
      setEditing(false);
      message.success(EDIT_SUCCESS_MESSAGE);
    });
  };

  return editing ? (
    <Form name="editable_text_form" form={form}>
      <Form.Item name="text" rules={rules}>
        <Input
          defaultValue={initialValue}
          onDoubleClick={toggleEditing}
          autoFocus
          onBlur={toggleEditing}
          onPressEnter={handleTextChange}
        />
      </Form.Item>
    </Form>
  ) : (
    <span className="editable-field clickable" onClick={toggleEditing}>
      {initialValue}
    </span>
  );
};

export default EditableText;
