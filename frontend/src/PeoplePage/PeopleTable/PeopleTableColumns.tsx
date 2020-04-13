import React from "react";

import TableTextFilter from "../../components/filters/TableTextFilter";
import {
  stringsFilterByField,
  arrayFilterByField,
  simpleFilterByField
} from "../../utils/filters";
import { Person } from "../../types/person";
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
import {
  get_column_fields,
  get_tag_fields,
  get_tag_list_fields
} from "../../utils/column_helpers";
import DeleteButton from "../../components/actions/DeleteButton";
import EditableText from "../../components/text/EditableText";

export const PeopleTableColumns = (
  { doesPersonExist, updatePerson, deletePerson }: PeopleContextInterface,
  { settings }: PeopleSettingsContextInterface
) => [
  {
    title: "שם מלא",
    ...get_column_fields<Person>("fullName", stringsFilterByField),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Person) => (
      <EditableText
        onChange={newValue => updatePerson(record, "fullName", newValue)}
        rules={GET_BASIC_TEXT_RULES()}
        initialValue={value}
      />
    ),
    width: "15em"
  },
  {
    title: "מ.א",
    ...get_column_fields<Person>("personalId", stringsFilterByField),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Person) => (
      <EditableText
        onChange={newValue => updatePerson(record, "personalId", newValue)}
        rules={GET_PERSONAL_ID_RULES(doesPersonExist)}
        initialValue={value}
      />
    ),
    width: "15em"
  },
  {
    title: "פלאפון",
    ...get_column_fields<Person>("phone"),
    render: (value: string, record: Person) => (
      <EditableText
        onChange={newValue => updatePerson(record, "phone", newValue)}
        rules={GET_PHONE_NUMBER_RULES()}
        initialValue={value}
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
    ...get_tag_list_fields<Person>(
      settings.possiblePreferences,
      "preferences",
      "הוספת העדפה",
      updatePerson
    )
  },
  {
    title: "מסלולים רלוונטיות",
    ...get_column_fields<Person>("tracks", arrayFilterByField),
    ...get_tag_list_fields<Person>(
      settings.possibleTracks,
      "tracks",
      "הוספת מסלול",
      updatePerson
    )
  },
  {
    title: "מערכים רלוונטיים",
    ...get_column_fields<Person>("subjects", arrayFilterByField),
    ...get_tag_list_fields<Person>(
      settings.possibleSubjects,
      "subjects",
      "הוספת מערך",
      updatePerson
    )
  },
  {
    title: "סגל עבר",
    ...get_column_fields<Person>("wasSegel"),
    render: (wasSegel: string, record: Person) => (
      <BooleanField
        checked={record.wasSegel}
        onChange={newValue => {
          updatePerson(record, "wasSegel", newValue);
        }}
      />
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
      <EditableText
        InputType={Input.TextArea}
        textClassName="remarks-text"
        onChange={newValue => updatePerson(record, "remarks", newValue)}
        initialValue={value}
      />
    )
  },
  {
    title: "",
    dataIndex: "",
    key: "actions",
    render: (text: string, record: Person) => (
      <DeleteButton
        confirmationMessage={`האם למחוק את ${record.fullName}?`}
        onDelete={() => deletePerson(record)}
      />
    )
  }
];
