import React, { useContext } from "react";
import { Person } from "../types/person";
import { ConditionalProps } from "../utils/types";
import { PeopleContext } from "../contexts/PeopleContext";
import { message, Checkbox } from "antd";

interface BooleanFieldProps {
  person: Person;
  field: ConditionalProps<Person, boolean>;
}

const BooleanField: React.FC<BooleanFieldProps> = ({ person, field }) => {
  const { updatePerson } = useContext(PeopleContext);

  const handleClick = () => {
    const newPerson = {
      ...person,
      [field]: !person[field]
    };
    updatePerson(newPerson);
    message.success("שדה עודכן בהצלחה");
  };

  return (
    <Checkbox
      checked={person[field]}
      className="clickable"
      onClick={handleClick}
    />
  );
};

export default BooleanField;
