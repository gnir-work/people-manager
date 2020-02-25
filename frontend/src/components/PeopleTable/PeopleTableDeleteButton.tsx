import React, { useContext, useCallback } from "react";
import { Icon, message } from "antd";
import { PeopleContext } from "../../contexts/PeopleContext";
import { PersonInterface } from "../../api/types";

import "./PeopleTableDeleteButton.scss";

interface PeopleTableDeleteButtonProps {
  person: PersonInterface;
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
  const handleClick = useCallback(() => {
    if (deletePerson(person)) {
      message.success(`${person.fullName} נמחק בהצלחה!`);
    } else {
      message.error(`לא ניתן למחוק את ${person.fullName}`);
    }
  }, [deletePerson]);

  return <Icon type="delete" onClick={handleClick} />;
};

export default PeopleTableDeleteButton;
