import React, { useState } from "react";
import { Person } from "../../types/person";

import PersonAutoComplete from "../../components/fields/PersonAutoComplete/PersonAutoComplete";
import PersonView from "../../components/fields/PersonAutoComplete/PersonView";

interface EditablePersonFieldProps {
  currentPerson: Person;
  onChange: (newPerson: Person) => void;
}

const EditablePersonField: React.FC<EditablePersonFieldProps> = ({
  currentPerson,
  onChange
}) => {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handlePersonSelection = (newPerson: Person) => {
    toggleEditing();
    onChange(newPerson);
  };

  return editing ? (
    <PersonAutoComplete
      onChange={handlePersonSelection}
      value={currentPerson}
    />
  ) : (
    <PersonView person={currentPerson} onClick={toggleEditing} />
  );
};

export default EditablePersonField;
