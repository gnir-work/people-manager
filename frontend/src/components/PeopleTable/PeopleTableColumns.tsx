import React from "react";

import TableTextFilter from "../filters/TableTextFilter";
import { sortByField } from "../../utils/sorters";
import {
  stringsFilterByField,
  arrayToAntdMappings,
  arrayFilterByField
} from "../../utils/filters";
import { Person } from "../../types/person";
import PersonTag from "./PersonTag";
import PeopleTableDeleteButton from "../actions/DeleteButton";
import EditableText from "../text/EditableText";
import PersonTags from "./PersonTags";
import {
  PERSON_STATUSES,
  PERSON_PREFERENCES,
  MEGAMUT,
  PREFERENCE_TO_COLOR,
  MEGAMUT_TO_COLOR,
  SUBJECTS,
  STATUS_TO_COLOR,
  AVAILABILITY_TO_COLOR,
  AVAILABILITY,
  ANTD_BOOLEAN_FILTERS
} from "../../consts";
import BooleanField from "../fields/BooleanField";
import {
  GET_PERSONAL_ID_RULES,
  GET_BASIC_TEXT_RULES,
  GET_PHONE_NUMBER_RULES
} from "../validators/validators";
import { PeopleContextInterface } from "../../contexts/PeopleContext";
import EditableTextAutoComplete from "../text/EditableTextAutoComplete";
import { Input } from "antd";

export const PeopleTableColumns = ({
  doesPersonExist
}: PeopleContextInterface) => [
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
      <EditableText
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
      <EditableText
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
      <EditableText
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
        possibleTags={PERSON_STATUSES}
        colors={STATUS_TO_COLOR}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(PERSON_STATUSES),
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
        possibleTags={AVAILABILITY}
        colors={AVAILABILITY_TO_COLOR}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(AVAILABILITY),
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
        possibleTags={PERSON_PREFERENCES}
        person={record}
        colors={PREFERENCE_TO_COLOR}
      />
    ),
    filters: arrayToAntdMappings(PERSON_PREFERENCES),
    onFilter: (preference: string, record: Person) =>
      arrayFilterByField(record, preference, "preferences")
  },
  {
    title: "מגמות רלוונטיות",
    dataIndex: "megamut",
    key: "megamut",
    render: (data: string[], record: Person) => (
      <PersonTags
        colors={MEGAMUT_TO_COLOR}
        field="megamut"
        possibleTags={MEGAMUT}
        person={record}
      />
    ),
    filters: arrayToAntdMappings(MEGAMUT),
    onFilter: (megama: string, record: Person) =>
      arrayFilterByField(record, megama, "megamut")
  },
  {
    title: "מערכים רלוונטיים",
    dataIndex: "subjects",
    key: "subjects",
    render: (data: string[], record: Person) => (
      <PersonTags field="subjects" possibleTags={SUBJECTS} person={record} />
    ),
    filters: arrayToAntdMappings(SUBJECTS),
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
      <EditableText
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
      <PeopleTableDeleteButton person={record} />
    )
  }
];
