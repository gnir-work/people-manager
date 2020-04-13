import React, { useState } from "react";
import { Person } from "../../../types/person";

import PersonAutoComplete from "./PersonAutoComplete";
import PersonView from "./PersonView";

interface EditablePersonAutoCompleteProps {
  currentPerson: Person;
  onChange: (newPerson: Person) => void;
}

const EditablePersonAutoComplete: React.FC<EditablePersonAutoCompleteProps> = ({
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

export default EditablePersonAutoComplete;
