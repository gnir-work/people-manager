import React, { useContext, useCallback } from "react";
import { Icon } from "antd";
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
  const handleClick = useCallback(() => {
    deletePerson(person);
  }, [deletePerson]);

  return <Icon type="delete" onClick={handleClick} />;
};

export default PeopleTableDeleteButton;
