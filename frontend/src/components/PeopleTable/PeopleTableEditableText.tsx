import React, { useContext, useState, KeyboardEvent } from "react";
import { AutoComplete, message } from "antd";
import { PersonInterface } from "../../api/types";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import "./PeopleTableDeleteButton.scss";
import { SelectValue } from "antd/lib/select";

import "./PeopleTableEditableText.scss";

interface PeopleTableEditableTextProps {
  initialValue: string;
  field: ConditionalProps<PersonInterface, string>;
  person: PersonInterface;
  initialDataSet?: string[];
  allowNewValues?: boolean;
}

/**
 * A delete button specific for the peoples data table.
 */
const PeopleTableEditableText: React.FC<PeopleTableEditableTextProps> = ({
  field,
  person,
  initialValue,
  allowNewValues = true,
  initialDataSet = []
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { getFieldDataSet, updatePerson } = useContext(PeopleContext);
  const wholeDataSet =
    initialDataSet.length > 0 ? initialDataSet : getFieldDataSet(field);
  const dataSet = wholeDataSet.filter((fieldValue: string) =>
    fieldValue.includes(value)
  );

  const toggleEditing = () => {
    setEditing(!editing);
  };

  /**
   * Update the application with the new value for the current field.
   * @param newValue
   */
  const finishEditing = (newValue: string) => {
    updatePerson({ ...person, [field]: newValue });
    setEditing(false);
    message.success("שדה עודכן בהצלחה");
  };

  /**
   * Handle the event of changing the value in the input.
   * @param value
   */
  const handleChange = (value: SelectValue) => {
    setValue(value.toString());
  };

  /**
   * Handle the event of selecting an item from the list, be it with the Enter key
   * or with the mouse.
   * @param value
   */
  const handleSelect = (value: SelectValue) => {
    setValue(value.toString());
    finishEditing(value.toString());
  };

  /**
   * Handle the case the value enter isn't part of the dataset (The case of adding a new value).
   * @param event
   */
  const createNewValue = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && dataSet.length === 0) {
      if (!allowNewValues) {
        message.error("בבקשה תבחרו אחד מהשדות הקיימים");
      } else {
        finishEditing(value);
      }
    }
  };

  return editing ? (
    <div
      className="editable-field"
      onDoubleClick={toggleEditing}
      onKeyDown={createNewValue}
    >
      <AutoComplete
        value={value}
        onSelect={handleSelect}
        onChange={handleChange}
        dataSource={dataSet}
      />
    </div>
  ) : (
    <span className="editable-field" onDoubleClick={toggleEditing}>
      {initialValue}
    </span>
  );
};

export default PeopleTableEditableText;
