import React, { createContext, useEffect, useState } from "react";
import {
  getPeople,
  updatePersonRequest,
  deletePersonRequest,
  createPersonRequest
} from "../api/people";
import { Person } from "../types/person";
import _ from "lodash";
import {
  getDataListContext,
  DataListContextInterface,
  DataListContextProvider
} from "./DataListContext";

export interface PeopleContextInterface
  extends DataListContextInterface<Person> {}

export const PeopleContext = getDataListContext<Person>();

const api = {
  get: getPeople,
  update: updatePersonRequest,
  delete: deletePersonRequest,
  add: createPersonRequest
};

/**
 * A context which handles all of the manipulation on the people dataset.
 * From fetching the data set to deleting or adding people.
 */
export const PeopleContextProvider: React.FC = ({ children }) => {
  return (
    <DataListContextProvider DataListContext={PeopleContext} api={api}>
      {children}
    </DataListContextProvider>
  );
};
