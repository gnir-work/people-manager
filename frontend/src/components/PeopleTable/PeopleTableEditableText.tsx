import React, { useContext, useState, KeyboardEvent } from "react";
import { AutoComplete } from "antd";
import { PersonInterface } from "../../api/types";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import "./PeopleTableDeleteButton.scss";
import { SelectValue } from "antd/lib/select";

interface PeopleTableEditableTextProps {
  text: string;
  initialValue: string;
  field: ConditionalProps<PersonInterface, string>;
  person: PersonInterface;
}

/**
 * A delete button specific for the peoples data table.
 */
const PeopleTableEditableText: React.FC<PeopleTableEditableTextProps> = ({
  text,
  field,
  person,
  initialValue
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { getFieldDataSet, updatePerson } = useContext(PeopleContext);
  const dataSet = getFieldDataSet(field).filter((fieldValue: string) =>
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
   * Handle the case that Enter was pressed however handleSelect was not fired as there are
   * no items to select (The case of adding a new item).
   * @param event
   */
  const handleEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      if (dataSet.length === 0) {
        finishEditing(value);
      }
    }
  };

  return editing ? (
    <div onDoubleClick={toggleEditing} onKeyDown={handleEnter}>
      <AutoComplete
        value={value}
        onSelect={handleSelect}
        onChange={handleChange}
        dataSource={dataSet}
      />
    </div>
  ) : (
    <span onDoubleClick={toggleEditing}>{text}</span>
  );
};

export default PeopleTableEditableText;
