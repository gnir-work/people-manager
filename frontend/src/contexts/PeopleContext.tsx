import React, { createContext, useEffect, useState } from "react";
import {
  getPeople,
  updatePersonRequest,
  deletePersonRequest,
  createPersonRequest
} from "../api/people";
import { Person, PersonFields } from "../types/person";
import _ from "lodash";
import { message } from "antd";
import { EDIT_SUCCESS_MESSAGE, EDIT_ERROR_MESSAGE } from "../consts";
import { AxiosError } from "axios";

export interface PeopleContextInterface {
  people: Person[];
  deletePerson: (personToDelete: Person) => void;
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
  deletePerson: (personToDelete: Person) => {},
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
  const deletePerson = (personToDelete: Person) => {
    deletePersonRequest(personToDelete.id)
      .then(response => {
        const filteredPeople = people.filter(
          person => person.id !== personToDelete.id
        );
        setPeople(filteredPeople);
        message.success(`${personToDelete.fullName} נמחק בהצלחה!`);
      })
      .catch(() => {
        message.error(`לא ניתן למחוק את ${personToDelete.fullName}`);
      });
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
    personToUpdate: Person,
    field: K,
    value: Person[K]
  ) {
    updatePersonRequest(personToUpdate.id, field, value)
      .then(response => {
        const newPerson = new Person({ ...personToUpdate, [field]: value });
        const newPeople = [
          ...people.map(person =>
            person.id === personToUpdate.id ? newPerson : person
          )
        ];
        setPeople(newPeople);
        message.success(EDIT_SUCCESS_MESSAGE);
      })
      .catch(error => {
        message.error(EDIT_ERROR_MESSAGE);
      });
  }

  /**
   * Create new Person
   */
  const addPerson = (newPersonFields: PersonFields) => {
    createPersonRequest(newPersonFields)
      .then(response => {
        const newPerson = new Person({
          ...newPersonFields,
          id: response.data.id
        });
        setPeople([...people, newPerson]);
        message.success(`${newPerson.fullName} נוצר בהצלחה`);
      })
      .catch((error: AxiosError) => {
        if (error && error.response && error.response.status === 409) {
          message.error(`יש כבר איש חוץ עם המ.א ${newPersonFields.personalId}`);
        } else {
          message.error("איש חוץ לא נוסף, היית שגיאה.");
        }
      });
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
