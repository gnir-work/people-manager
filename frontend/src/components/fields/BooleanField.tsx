import React, { useContext } from "react";
import { Person } from "../../types/person";
import { ConditionalProps } from "../../utils/types";
import { PeopleContext } from "../../contexts/PeopleContext";
import { message, Checkbox } from "antd";
import { EDIT_SUCCESS_MESSAGE } from "../../consts";

interface BooleanFieldProps {
  person: Person;
  field: ConditionalProps<Person, boolean>;
}

const BooleanField: React.FC<BooleanFieldProps> = ({ person, field }) => {
  const { updatePerson } = useContext(PeopleContext);

  const handleClick = () => {
    updatePerson(person, field, !person[field]);
    message.success(EDIT_SUCCESS_MESSAGE);
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
