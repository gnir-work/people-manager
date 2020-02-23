import React, { createContext, useEffect, useState } from "react";
import { getPeople } from "../api/people";
import { PersonInterface } from "../api/types";

const defaultData: { people: PersonInterface[]; deletePerson: Function } = {
  people: [],
  deletePerson: () => {}
};

export const PeopleContext = createContext(defaultData);

/**
 * A context which handles all of the manipulation on the people dataset.
 * From fetching the data set to deleting or adding people.
 */
export const PeopleContextProvider: React.FC = ({ children }) => {
  const [people, setPeople]: [PersonInterface[], Function] = useState([]);

  useEffect(() => {
    setPeople(getPeople());
  }, []);

  /**
   * Deletes a specific person identified by _id.
   * @param personToDelete The person to delete from the dataset.
   */
  const deletePerson = (personToDelete: PersonInterface) => {
    const filteredPeople = people.filter(
      person => person._id !== personToDelete._id
    );
    setPeople(filteredPeople);
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        deletePerson
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
