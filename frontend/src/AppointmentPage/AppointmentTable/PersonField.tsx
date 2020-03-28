import React, { useContext, useState } from "react";
import { Person } from "../../types/person";

import "./PersonField.scss";
import { PeopleContext } from "../../contexts/PeopleContext";
import { AutoComplete } from "antd";

interface PersonFieldProps {
  person: Person;
  onChange: (newPerson: Person) => void;
}

const PersonField: React.FC<PersonFieldProps> = ({ person, onChange }) => {
  const { people } = useContext(PeopleContext);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState(person.fullName);

  const dataSet = people.filter(person => person.fullName.includes(filter));
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handlePersonSelection = (newPersonId: string) => {
    const newPerson = people.find(person => person.id === newPersonId);
    if (newPerson) {
      onChange(newPerson);
      toggleEditing();
      setFilter(newPerson.fullName);
    } else {
      console.warn(`No person with id ${newPersonId}`);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return editing ? (
    <AutoComplete
      onChange={handleFilterChange}
      value={filter}
      onSelect={handlePersonSelection}
    >
      {dataSet.map(person => (
        <AutoComplete.Option key={person.id} value={person.id}>
          {person.fullName}
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  ) : (
    <div className="person-field clickable" onClick={toggleEditing}>
      <span className="person-name">{person.fullName}</span>
      <span className="person-id">{person.personalId}</span>
    </div>
  );
};

export default PersonField;
