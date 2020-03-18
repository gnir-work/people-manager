import React, { useContext } from "react";
import { Icon, message } from "antd";
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

  /**
   * Delete the person passed as a props to this component and show a toaster with
   * the result of the deletion (Success or Failure).
   */
  const handleClick = () => {
    if (deletePerson(person)) {
      message.success(`${person.fullName} נמחק בהצלחה!`);
    } else {
      message.error(`לא ניתן למחוק את ${person.fullName}`);
    }
  };

  return <Icon type="delete" onClick={handleClick} />;
};

export default PeopleTableDeleteButton;
