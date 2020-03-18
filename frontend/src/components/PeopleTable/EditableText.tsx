import React, { useContext, useState, KeyboardEvent, ChangeEvent } from "react";
import { message, Input } from "antd";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import "./EditableText.scss";

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

  /**
   * Handle the event of changing the value in the input.
   * @param value
   */
  const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
    setValue(value.target.value);
  };

  /**
   * Handle the case the value enter isn't part of the dataset (The case of adding a new value).
   * @param event
   */
  const createNewValue = (event: KeyboardEvent<HTMLDivElement>) => {
    updatePerson({ ...person, [field]: value });
    setEditing(false);
    message.success("שדה עודכן בהצלחה");
  };

  return editing ? (
    <div onClick={toggleEditing}>
      <Input
        autoFocus
        onBlur={toggleEditing}
        value={value}
        onChange={handleChange}
        onPressEnter={createNewValue}
      />
    </div>
  ) : (
    <span className="editable-field" onClick={toggleEditing}>
      {initialValue}
    </span>
  );
};

export default PeopleTableEditableText;
