import React, { useContext } from "react";
import { Person } from "../../types/person";
import { ConditionalProps } from "../../utils/types";
import { PeopleContext } from "../../contexts/PeopleContext";
import { Checkbox } from "antd";

interface BooleanFieldProps {
  person: Person;
  field: ConditionalProps<Person, boolean>;
}

const BooleanField: React.FC<BooleanFieldProps> = ({ person, field }) => {
  const { updatePerson } = useContext(PeopleContext);

  const handleClick = () => {
    updatePerson(person, field, !person[field]);
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
