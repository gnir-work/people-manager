import React, { useContext, useCallback } from "react";
import { statusToColor, personStatuses } from "../../consts";
import EditableTag from "../EditableTag";
import { PeopleContext } from "../../contexts/PeopleContext";
import { Person } from "../../types/person";

export interface PersonStatusProps {
  person: Person;
}

const PersonStatus: React.FC<PersonStatusProps> = ({ person }) => {
  const { updatePerson } = useContext(PeopleContext);

  const handleStatusChange = useCallback(
    (newStatus: string) => {
      const newPerson = {
        ...person,
        status: newStatus
      };
      updatePerson(newPerson);
    },
    [updatePerson]
  );

  return (
    <EditableTag
      onTagChange={handleStatusChange}
      possibleTags={personStatuses}
      color={statusToColor[person.status]}
    >
      {person.status}
    </EditableTag>
  );
};

export default PersonStatus;
