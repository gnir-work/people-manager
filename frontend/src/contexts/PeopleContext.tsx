import React, { createContext, useEffect, useState } from "react";
import { getPeople } from "../api/people";
import { Person } from "../types/person";
import _ from "lodash";

const defaultData: {
  people: Person[];
  deletePerson: Function;
  getFieldDataSet: Function;
  updatePerson: Function;
} = {
  people: [],
  deletePerson: () => {},
  getFieldDataSet: () => {},
  updatePerson: () => {}
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

  return (
    <PeopleContext.Provider
      value={{
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
