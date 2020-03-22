import React, { useContext } from "react";
import { message, Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { PeopleContext } from "../../contexts/PeopleContext";
import { Person } from "../../types/person";

import "./DeleteButton.scss";

interface PeopleTableDeleteButtonProps {
  person: Person;
}

/**
 * A delete button specific for the peoples data table.
 */
const PeopleTableDeleteButton: React.FC<PeopleTableDeleteButtonProps> = ({
  person
}) => {
  const { deletePerson } = useContext(PeopleContext);

  const handlePersonDeletion = () => {
    deletePerson(person);
  };

  return (
    <Popconfirm
      title={`האם למחוק את ${person.fullName}?`}
      onConfirm={handlePersonDeletion}
      okText="כן"
      cancelText="לא"
      placement="right"
    >
      <DeleteFilled />
    </Popconfirm>
  );
};

export default PeopleTableDeleteButton;
