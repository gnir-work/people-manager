import React from "react";

import TableTextFilter from "../TableTextFilter";
import { sortById, sortByName, sortByTeam } from "../../utils/sorters";
import {
  stringsFilterByField,
  arrayToAntdMappings,
  arrayFilterByField
} from "../../utils/filters";
import { Person } from "../../types/person";
import PersonStatus from "./PersonStatus";
import PeopleTableDeleteButton from "./DeleteButton";
import PeopleTableEditableText from "./EditableText";
import PersonPreferenceTags from "./PersonPreferences";
import Megamut from "./Megamut";
import { personStatuses, personPreferences, megamut } from "../../consts";

const personStatusFilters = arrayToAntdMappings(personStatuses);
const personPreferenceFilters = arrayToAntdMappings(personPreferences);
const megamaFilters = arrayToAntdMappings(megamut);

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
    width: "15em"
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
    title: "פלאפון",
    dataIndex: "phone",
    key: "phone",
    render: (value: string, record: Person) => (
      <PeopleTableEditableText
        field="phone"
        person={record}
        initialValue={value}
      />
    ),
    width: "12em"
  },
  {
    title: "מצב שירות",
    dataIndex: "status",
    key: "status",
    render: (status: string) => <PersonStatus status={status} />,
    filters: personStatusFilters,
    onFilter: (status: string, record: Person) =>
      stringsFilterByField(record, status, "status")
  },
  {
    title: "צוות אחרון",
    dataIndex: "team",
    key: "team",
    sorter: sortByTeam,
    onFilter: (value: string, record: Person) =>
      stringsFilterByField(record, value, "team"),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Person) => (
      <PeopleTableEditableText
        field="team"
        person={record}
        initialValue={value}
      />
    ),
    width: "10em"
  },
  {
    title: "העדפות",
    dataIndex: "preferences",
    key: "preferences",
    render: (preferences: string[], record: Person) => (
      <PersonPreferenceTags person={record} />
    ),
    width: "30em",
    filters: personPreferenceFilters,
    onFilter: (preference: string, record: Person) =>
      arrayFilterByField(record, preference, "preferences")
  },
  {
    title: "מגמות רלוונטיות",
    dataIndex: "megamut",
    key: "megamut",
    render: (preferences: string[], record: Person) => (
      <Megamut person={record} />
    ),
    width: "30em",
    filters: megamaFilters,
    onFilter: (megama: string, record: Person) =>
      arrayFilterByField(record, megama, "megamut")
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
