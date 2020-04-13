import React from "react";

import TableTextFilter from "../../components/filters/TableTextFilter";
import {
  stringsFilterByField,
  arrayToAntdMappings,
  arrayFilterByField,
  simpleFilterByField
} from "../../utils/filters";
import { Person } from "../../types/person";
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
import { PeopleSettingsContextInterface } from "../../contexts/PeopleSettingsContext";
import PersonDeleteButton from "./PersonDeleteButton";
import { get_column_fields, get_tag_fields } from "../../utils/column_helpers";

export const PeopleTableColumns = (
  { doesPersonExist, updatePerson }: PeopleContextInterface,
  { settings }: PeopleSettingsContextInterface
) => [
  {
    title: "שם מלא",
    ...get_column_fields<Person>("fullName", stringsFilterByField),
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
    ...get_column_fields<Person>("personalId", stringsFilterByField),
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
    ...get_column_fields<Person>("phone"),
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
    ...get_column_fields<Person>("status", simpleFilterByField),
    ...get_tag_fields<Person>(settings.possibleStatuses, "status", updatePerson)
  },
  {
    title: "זמינות",
    ...get_column_fields<Person>("availability", simpleFilterByField),
    ...get_tag_fields<Person>(
      settings.possibleAvailabilities,
      "availability",
      updatePerson
    )
  },
  {
    title: "צוות",
    ...get_column_fields<Person>("team", stringsFilterByField),
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
    ...get_column_fields<Person>("preferences", arrayFilterByField),
    render: (data: string[], record: Person) => (
      <PersonTags
        field="preferences"
        possibleTags={settings.possiblePreferences}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(settings.possiblePreferences)
  },
  {
    title: "מסלולים רלוונטיות",
    ...get_column_fields<Person>("tracks", arrayFilterByField),
    render: (data: string[], record: Person) => (
      <PersonTags
        field="tracks"
        possibleTags={settings.possibleTracks}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(settings.possibleTracks)
  },
  {
    title: "מערכים רלוונטיים",
    ...get_column_fields<Person>("subjects", arrayFilterByField),
    render: (data: string[], record: Person) => (
      <PersonTags
        field="subjects"
        possibleTags={settings.possibleSubjects}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(settings.possibleSubjects)
  },
  {
    title: "סגל עבר",
    ...get_column_fields<Person>("wasSegel"),
    render: (wasSegel: string, record: Person) => (
      <BooleanField field="wasSegel" person={record} />
    ),
    filters: ANTD_BOOLEAN_FILTERS,
    onFilter: (wasSegel: string, record: Person) =>
      String(record.wasSegel) === wasSegel
  },
  {
    title: "הערות נוספות",
    ...get_column_fields<Person>("remarks", stringsFilterByField),
    width: "30em",
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
