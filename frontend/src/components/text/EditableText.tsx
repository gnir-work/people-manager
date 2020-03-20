import React, { useContext } from "react";
import { message, Input } from "antd";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import { EDIT_SUCCESS_MESSAGE } from "../../consts";
import { Rule } from "antd/lib/form";
import EditableTextForm from "./EditableTextForm";

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
  const { updatePerson } = useContext(PeopleContext);

  const handleTextChange = (newValue: string) => {
    updatePerson({ ...person, [field]: newValue });
    message.success(EDIT_SUCCESS_MESSAGE);
  };

  return (
    <EditableTextForm
      rules={rules}
      currentValue={initialValue}
      onSubmit={handleTextChange}
    >
      {(validateForm, toggleEditing) => (
        <Input
          defaultValue={initialValue}
          onDoubleClick={toggleEditing}
          autoFocus
          onBlur={toggleEditing}
          onPressEnter={validateForm}
        />
      )}
    </EditableTextForm>
  );
};

export default EditableText;
