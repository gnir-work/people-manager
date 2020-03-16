import React from "react";

import TableTextFilter from "../TableTextFilter";
import { sortById, sortByName } from "../../utils/sorters";
import {
  stringsFilterByField,
  enumMappingToAntdFilters,
  numbersFilterByField,
  arrayFilterByField
} from "../../utils/filters";
import { Person, PersonStatuses, PersonPreference } from "../../types/person";
import { personStatusToText, personPreferenceToText } from "../../consts";
import PersonStatus from "./PersonStatus";
import PeopleTableDeleteButton from "./DeleteButton";
import PeopleTableEditableText from "./EditableText";
import PersonPreferenceTags from "./PersonPreferences";

const personStatusFilters = enumMappingToAntdFilters(personStatusToText);
const personPreferenceFilters = enumMappingToAntdFilters(
  personPreferenceToText
);

export const PeopleTableColumns = [
  {
    title: "שם מלא",
    dataIndex: "fullName",
    key: "fullName",
    sorter: sortByName,
    onFilter: (value: string, record: Person) =>
      stringsFilterByField(record, value, "fullName"),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Person) => (
      <PeopleTableEditableText
        field="fullName"
        person={record}
        initialValue={value}
      />
    ),
    width: "40em"
  },
  {
    title: "מ.א",
    dataIndex: "personalId",
    key: "personalId",
    sorter: sortById,
    onFilter: (value: string, record: Person) =>
      stringsFilterByField(record, value, "personalId"),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Person) => (
      <PeopleTableEditableText
        field="personalId"
        person={record}
        initialValue={value}
      />
    )
  },
  {
    title: "מצב שירות",
    dataIndex: "status",
    key: "status",
    render: (status: PersonStatuses) => <PersonStatus status={status} />,
    filters: personStatusFilters,
    onFilter: (status: string, record: Person) =>
      numbersFilterByField(record, status, "status")
  },
  {
    title: "העדפות",
    dataIndex: "preferences",
    key: "preferences",
    render: (preferences: PersonPreference[]) => (
      <PersonPreferenceTags preferences={preferences} />
    ),
    width: "30em",
    filters: personPreferenceFilters,
    onFilter: (preference: string, record: Person) =>
      arrayFilterByField(record, Number.parseInt(preference), "preferences")
  },
  {
    title: "הערות נוספות",
    dataIndex: "remarks",
    key: "remarks",
    width: "30em",
    onFilter: (value: string, record: Person) =>
      stringsFilterByField(record, value, "remarks"),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Person) => (
      <PeopleTableEditableText
        field="remarks"
        person={record}
        initialValue={value}
      />
    )
  },
  {
    title: "",
    dataIndex: "",
    key: "actions",
    render: (text: string, record: Person) => (
      <PeopleTableDeleteButton person={record} />
    )
  }
];
