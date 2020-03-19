import React, { createContext, useEffect, useState } from "react";
import { getPeople } from "../api/people";
import { Person, PersonFields } from "../types/person";
import _ from "lodash";

const defaultData: {
  people: Person[];
  deletePerson: (personToDelete: Person) => boolean;
  getFieldDataSet: (field: keyof Person) => any[];
  updatePerson: (newPerson: Person) => void;
  addPerson: (newPersonFields: PersonFields) => void;
} = {
  people: [],
  deletePerson: (personToDelete: Person) => true,
  getFieldDataSet: (field: keyof Person) => [],
  updatePerson: (newPerson: Person) => {},
  addPerson: (newPersonFields: PersonFields) => {}
};

export const PeopleContext = createContext(defaultData);

/**
 * A context which handles all of the manipulation on the people dataset.
 * From fetching the data set to deleting or adding people.
 */
export const PeopleContextProvider: React.FC = ({ children }) => {
  const [people, setPeople]: [Person[], Function] = useState([]);

  useEffect(() => {
    setPeople(getPeople());
  }, []);

  /**
   * Deletes a specific person identified by id.
   *
   * @param personToDelete The person to delete from the dataset.
   * @returns a boolean indicating the success of the operation.
   */
  const deletePerson = (personToDelete: Person): boolean => {
    if (people.find(person => person.id === personToDelete.id)) {
      const filteredPeople = people.filter(
        person => person.id !== personToDelete.id
      );
      setPeople(filteredPeople);
      return true;
    } else {
      return false;
    }
  };

  /**
   * Retrieves all of the unique values of a given field.
   * @param field The field from which the data set should be built
   */
  const getFieldDataSet = (field: keyof Person) => {
    const fields = people.map((person: Person) => person[field]);
    return _.uniq(fields);
  };

  /**
   * Update a specific person.
   */
  const updatePerson = (newPerson: Person) => {
    const newPeople = [
      ...people.map(person => (person.id === newPerson.id ? newPerson : person))
    ];
    setPeople(newPeople);
  };

  /**
   * Create new Person
   */
  const addPerson = (newPersonFields: PersonFields) => {
    setPeople([...people, new Person(newPersonFields)]);
  };

  return (
    <PeopleContext.Provider
      value={{
        addPerson,
        people,
        deletePerson,
        getFieldDataSet,
        updatePerson
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
