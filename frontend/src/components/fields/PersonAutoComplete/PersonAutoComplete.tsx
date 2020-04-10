import React, { useContext, useState } from "react";
import { Person } from "../../../types/person";

import { PeopleContext } from "../../../contexts/PeopleContext";
import { AutoComplete } from "antd";
import PersonView from "./PersonView";

interface PersonAutoCompleteProps {
  value: Person;
  onChange: (newPerson: Person) => void;
}

const PersonAutoComplete: React.FC<PersonAutoCompleteProps> = ({
  value,
  onChange
}) => {
  const { people } = useContext(PeopleContext);
  const [filter, setFilter] = useState(value.fullName);

  const dataSet = people.filter((person: Person) =>
    person.fullName.includes(filter)
  );

  const handlePersonSelection = (newPersonId: string) => {
    const newPerson = people.find(
      (person: Person) => person.id === newPersonId
    );
    if (newPerson) {
      onChange(newPerson);
      setFilter(newPerson.fullName);
    } else {
      console.warn(`No person with id ${newPersonId}`);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <AutoComplete
      onChange={handleFilterChange}
      value={filter}
      onSelect={handlePersonSelection}
    >
      {dataSet.map((person: Person) => (
        <AutoComplete.Option key={person.id} value={person.id}>
          <PersonView person={person} />
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  );
};

export default PersonAutoComplete;
