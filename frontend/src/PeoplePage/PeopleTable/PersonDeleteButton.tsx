import React, { useContext } from "react";
import DeleteButton from "../../components/actions/DeleteButton";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";

interface PersonDeleteButtonProps {
  person: Person;
}

const PersonDeleteButton: React.FC<PersonDeleteButtonProps> = ({ person }) => {
  const { deletePerson } = useContext(PeopleContext);
  return (
    <DeleteButton
      confirmationMessage={`האם למחוק את ${person.fullName}?`}
      onDelete={() => deletePerson(person)}
    />
  );
};

export default PersonDeleteButton;
