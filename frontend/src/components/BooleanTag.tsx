import React, { useContext } from "react";
import { Person } from "../types/person";
import { ConditionalProps } from "../utils/types";
import { PeopleContext } from "../contexts/PeopleContext";
import { Tag } from "antd";

interface BooleanTagProps {
  person: Person;
  field: ConditionalProps<Person, boolean>;
}

const BooleanTag: React.FC<BooleanTagProps> = ({ person, field }) => {
  const { updatePerson } = useContext(PeopleContext);

  const handleClick = () => {
    const newPerson = {
      ...person,
      [field]: !person[field]
    };
    updatePerson(newPerson);
  };

  return (
    <Tag
      className="clickable"
      onClick={handleClick}
      color={person[field] ? "green" : "red"}
    >
      {person[field] ? "כן" : "לא"}
    </Tag>
  );
};

export default BooleanTag;
