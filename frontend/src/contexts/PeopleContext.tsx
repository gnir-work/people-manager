import React, { createContext, useEffect, useState } from "react";
import { getPeople } from "../api/people";
import { Person, PersonFields } from "../types/person";
import _ from "lodash";

export interface PeopleContextInterface {
  people: Person[];
  deletePerson: (personToDelete: Person) => boolean;
  getFieldDataSet: (field: keyof Person) => any[];
  updatePerson: <K extends keyof Person>(
    personToUpdate: Person,
    field: K,
    value: Person[K]
  ) => void;
  addPerson: (newPersonFields: PersonFields) => void;
  doesPersonExist: (personId: string) => boolean;
}

const defaultData: PeopleContextInterface = {
  people: [],
  deletePerson: (personToDelete: Person) => true,
  getFieldDataSet: (field: keyof Person) => [],
  updatePerson: (newPerson: Person) => {},
  addPerson: (newPersonFields: PersonFields) => {},
  doesPersonExist: (personId: string) => false
};

export const PeopleContext = createContext(defaultData);

/**
 * A context which handles all of the manipulation on the people dataset.
 * From fetching the data set to deleting or adding people.
 */
export const PeopleContextProvider: React.FC = ({ children }) => {
  const [people, setPeople]: [Person[], Function] = useState([]);

  useEffect(() => {
    getPeople().then(newPeople => {
      setPeople(newPeople);
    });
  }, []);

  /**
   * Check if we already have a person with this id.
   * @param personId The id of the person.
   */
  const doesPersonExist = (personId: string) =>
    !!_.find(people, ["id", personId]);

  /**
   * Deletes a specific person identified by id.
   *
   * @param personToDelete The person to delete from the dataset.
   * @returns a boolean indicating the success of the operation.
   */
  const deletePerson = (personToDelete: Person): boolean => {
    if (doesPersonExist(personToDelete.id)) {
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
  function updatePerson<K extends keyof Person>(
    person: Person,
    field: K,
    value: Person[K]
  ) {
    const newPerson = new Person({ ...person, [field]: value });
    const newPeople = [
      ...people.map(person => (person.id === newPerson.id ? newPerson : person))
    ];
    setPeople(newPeople);
  }

  /**
   * Create new Person
   */
  const addPerson = (newPersonFields: PersonFields) => {
    setPeople([...people, new Person(newPersonFields)]);
  };

  return (
    <PeopleContext.Provider
      value={{
        doesPersonExist,
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
