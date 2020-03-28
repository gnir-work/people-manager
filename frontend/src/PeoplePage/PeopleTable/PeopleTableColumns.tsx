import React from "react";

import TableTextFilter from "../../components/filters/TableTextFilter";
import { sortByField } from "../../utils/sorters";
import {
  stringsFilterByField,
  arrayToAntdMappings,
  arrayFilterByField
} from "../../utils/filters";
import { Person } from "../../types/person";
import PersonTag from "./PersonTag";
import EditableTextWithPersonContext from "./EditableTextWithPersonContext";
import PersonTags from "./PersonTags";
import { ANTD_BOOLEAN_FILTERS } from "../../consts";
import BooleanField from "../../components/fields/BooleanField";
import {
  GET_PERSONAL_ID_RULES,
  GET_BASIC_TEXT_RULES,
  GET_PHONE_NUMBER_RULES
} from "../../components/validators/validators";
import { PeopleContextInterface } from "../../contexts/PeopleContext";
import EditableTextAutoComplete from "../../components/text/EditableTextAutoComplete";
import { Input } from "antd";
import { PeopleSettingsContext } from "../../contexts/PeopleSettingsContext";
import PersonDeleteButton from "./PersonDeleteButton";

export const PeopleTableColumns = (
  { doesPersonExist }: PeopleContextInterface,
  { settings }: PeopleSettingsContext
) => [
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
      <EditableTextWithPersonContext
        field="fullName"
        person={record}
        initialValue={value}
        rules={GET_BASIC_TEXT_RULES()}
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
      <EditableTextWithPersonContext
        field="personalId"
        person={record}
        initialValue={value}
        rules={GET_PERSONAL_ID_RULES(doesPersonExist)}
      />
    ),
    width: "15em"
  },
  {
    title: "פלאפון",
    dataIndex: "phone",
    key: "phone",
    render: (value: string, record: Person) => (
      <EditableTextWithPersonContext
        field="phone"
        person={record}
        initialValue={value}
        rules={GET_PHONE_NUMBER_RULES()}
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
        possibleTags={settings.possibleStatuses}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(settings.possibleStatuses),
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
        possibleTags={settings.possibleAvailabilities}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(settings.possibleAvailabilities),
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
      <EditableTextAutoComplete
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
        possibleTags={settings.possiblePreferences}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(settings.possiblePreferences),
    onFilter: (preference: string, record: Person) =>
      arrayFilterByField(record, preference, "preferences")
  },
  {
    title: "מסלולים רלוונטיות",
    dataIndex: "tracks",
    key: "tracks",
    render: (data: string[], record: Person) => (
      <PersonTags
        field="tracks"
        possibleTags={settings.possibleTracks}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(settings.possibleTracks),
    onFilter: (megama: string, record: Person) =>
      arrayFilterByField(record, megama, "tracks")
  },
  {
    title: "מערכים רלוונטיים",
    dataIndex: "subjects",
    key: "subjects",
    render: (data: string[], record: Person) => (
      <PersonTags
        field="subjects"
        possibleTags={settings.possibleSubjects}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(settings.possibleSubjects),
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
    filters: ANTD_BOOLEAN_FILTERS,
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
      <EditableTextWithPersonContext
        textClassName="remarks-text"
        InputType={Input.TextArea}
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
      <PersonDeleteButton person={record} />
    )
  }
];
