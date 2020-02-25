import React, { useCallback, useContext, useState, useEffect } from "react";
import { AutoComplete } from "antd";
import { PersonInterface } from "../../api/types";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import "./PeopleTableDeleteButton.scss";
import { SelectValue } from "antd/lib/select";

interface PeopleTableEditableTextProps {
  text: string;
  field: ConditionalProps<PersonInterface, string>;
  person: PersonInterface;
}

/**
 * A delete button specific for the peoples data table.
 */
const PeopleTableEditableText: React.FC<PeopleTableEditableTextProps> = ({
  text,
  field,
  person
}) => {
  const [editing, setEditing] = useState(false);
  const { getFieldDataSet, updatePerson } = useContext(PeopleContext);

  const dataSet = getFieldDataSet(field).filter(data:string => data.contains);

  console.log(dataSet);
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleChange = (value: SelectValue) => {
    const newPerson: PersonInterface = { ...person, [field]: value.toString() };
    updatePerson(newPerson);
  };

  const handleSelect = (value: SelectValue) => {
    const newPerson: PersonInterface = { ...person, [field]: value.toString() };
    updatePerson(newPerson);
    setEditing(false);
  };

  return editing ? (
    <div onDoubleClick={toggleEditing}>
      <AutoComplete
        defaultOpen={true}
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
