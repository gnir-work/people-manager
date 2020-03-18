import React from "react";

import TableTextFilter from "../TableTextFilter";
import { sortByField } from "../../utils/sorters";
import {
  stringsFilterByField,
  arrayToAntdMappings,
  arrayFilterByField
} from "../../utils/filters";
import { Person } from "../../types/person";
import PersonTag from "./PersonTag";
import PeopleTableDeleteButton from "./DeleteButton";
import PeopleTableEditableText from "./EditableText";
import PersonTags from "./PersonTags";
import {
  personStatuses,
  personPreferences,
  megamut,
  preferenceToColor,
  megamutToColor,
  subjects,
  statusToColor,
  availabilityToColor,
  availability,
  antdBooleanFilters
} from "../../consts";
import BooleanField from "../BooleanField";

export const PeopleTableColumns = [
  {
    title: "שם מלא",
    dataIndex: "fullName",
    key: "fullName",
    sorter: (firstPerson: Person, secondPerson: Person) =>
      sortByField(firstPerson, secondPerson, "fullName"),
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
    sorter: (firstPerson: Person, secondPerson: Person) =>
      sortByField(firstPerson, secondPerson, "personalId"),
    onFilter: (value: string, record: Person) =>
      stringsFilterByField(record, value, "personalId"),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Person) => (
      <PeopleTableEditableText
        field="personalId"
        person={record}
        initialValue={value}
      />
    ),
    width: "15em"
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
    sorter: (firstPerson: Person, secondPerson: Person) =>
      sortByField(firstPerson, secondPerson, "status"),
    key: "status",
    render: (status: string, record: Person) => (
      <PersonTag
        field="status"
        possibleTags={personStatuses}
        colors={statusToColor}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(personStatuses),
    onFilter: (status: string, record: Person) => record.status === status
  },
  {
    title: "זמינות",
    dataIndex: "availability",
    key: "availability",
    sorter: (firstPerson: Person, secondPerson: Person) =>
      sortByField(firstPerson, secondPerson, "availability"),
    render: (currentAvailability: string, record: Person) => (
      <PersonTag
        field="availability"
        possibleTags={availability}
        colors={availabilityToColor}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(availability),
    onFilter: (availability: string, record: Person) =>
      record.availability === availability
  },
  {
    title: "צוות",
    dataIndex: "team",
    key: "team",
    sorter: (firstPerson: Person, secondPerson: Person) =>
      sortByField(firstPerson, secondPerson, "team"),
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
    filters: arrayToAntdMappings(subjects),
    onFilter: (subject: string, record: Person) =>
      arrayFilterByField(record, subject, "subjects")
  },
  {
    title: "סגל עבר",
    dataIndex: "wasSegel",
    key: "wasSegel",
    sorter: (firstPerson: Person, secondPerson: Person) =>
      sortByField(firstPerson, secondPerson, "wasSegel"),
    render: (wasSegel: string, record: Person) => (
      <BooleanField field="wasSegel" person={record} />
    ),
    filters: antdBooleanFilters,
    onFilter: (wasSegel: string, record: Person) =>
      String(record.wasSegel) === wasSegel
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
