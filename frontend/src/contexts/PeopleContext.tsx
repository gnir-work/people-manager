import React from "react";
import { Person } from "../types/person";
import {
  getDataListContext,
  DataListContextInterface,
  DataListContextProvider
} from "./DataListContext";
import { createCrudApi } from "../api/crud";

export interface PeopleContextInterface
  extends DataListContextInterface<Person> {}

export const PeopleContext = getDataListContext<Person>();

const peopleCrudApi = createCrudApi<Person>({ url: "/api/people/person" });

export const PeopleContextProvider: React.FC = ({ children }) => (
  <DataListContextProvider DataListContext={PeopleContext} api={peopleCrudApi}>
    {children}
  </DataListContextProvider>
);
