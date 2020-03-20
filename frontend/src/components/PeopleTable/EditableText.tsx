import React, { useContext, useState, KeyboardEvent, ChangeEvent } from "react";
import { message, Input } from "antd";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import "./EditableText.scss";
import { EDIT_SUCCESS_MESSAGE } from "../../consts";

interface PeopleTableEditableTextProps {
  initialValue: string;
  field: ConditionalProps<Person, string>;
  person: Person;
}

/**
 * A delete button specific for the peoples data table.
 */
const PeopleTableEditableText: React.FC<PeopleTableEditableTextProps> = ({
  field,
  person,
  initialValue
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { updatePerson } = useContext(PeopleContext);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
    setValue(value.target.value);
  };

  const handleTextChange = (event: KeyboardEvent<HTMLDivElement>) => {
    updatePerson({ ...person, [field]: value });
    setEditing(false);
    message.success(EDIT_SUCCESS_MESSAGE);
  };

  return editing ? (
    <Input
      onDoubleClick={toggleEditing}
      autoFocus
      onBlur={toggleEditing}
      value={value}
      onChange={handleChange}
      onPressEnter={handleTextChange}
    />
  ) : (
    <span className="editable-field clickable" onClick={toggleEditing}>
      {initialValue}
    </span>
  );
};

export default PeopleTableEditableText;
