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
import PersonTags from "./PersonTags";
import {
  personStatuses,
  personPreferences,
  megamut,
  preferenceToColor,
  megamutToColor,
  subjects
} from "../../consts";

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
    render: (status: string, record: Person) => (
      <PersonStatus person={record} />
    ),
    filters: arrayToAntdMappings(personStatuses),
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
    width: "12em"
  },
  {
    title: "העדפות",
    dataIndex: "preferences",
    key: "preferences",
    render: (data: string[], record: Person) => (
      <PersonTags
        field="preferences"
        possibleTags={personPreferences}
        person={record}
        colors={preferenceToColor}
      />
    ),
    width: "30em",
    filters: arrayToAntdMappings(personPreferences),
    onFilter: (preference: string, record: Person) =>
      arrayFilterByField(record, preference, "preferences")
  },
  {
    title: "מגמות רלוונטיות",
    dataIndex: "megamut",
    key: "megamut",
    render: (data: string[], record: Person) => (
      <PersonTags
        colors={megamutToColor}
        field="megamut"
        possibleTags={megamut}
        person={record}
      />
    ),
    width: "30em",
    filters: arrayToAntdMappings(megamut),
    onFilter: (megama: string, record: Person) =>
      arrayFilterByField(record, megama, "megamut")
  },
  {
    title: "מערכים רלוונטיים",
    dataIndex: "subjects",
    key: "subjects",
    render: (data: string[], record: Person) => (
      <PersonTags field="subjects" possibleTags={subjects} person={record} />
    ),
    width: "30em",
    filters: arrayToAntdMappings(subjects),
    onFilter: (subject: string, record: Person) =>
      arrayFilterByField(record, subject, "subjects")
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
