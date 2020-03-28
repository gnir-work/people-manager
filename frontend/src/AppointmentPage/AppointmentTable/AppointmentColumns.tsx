import React from "react";
import { sortByField } from "../../utils/sorters";
import {
  stringsFilterByField,
  simpleFilterByField,
  arrayToAntdMappings
} from "../../utils/filters";
import TableTextFilter from "../../components/filters/TableTextFilter";
import { Appointment } from "../../types/appointment";
import { Checkbox } from "antd";
import { ANTD_BOOLEAN_FILTERS } from "../../consts";
import AppointmentDeleteButton from "./AppointmentDeleteButton";
import { AppointmentsContextInterface } from "../../contexts/AppointmentContext";
import EditableText from "../../components/text/EditableText";
import TextArea from "antd/lib/input/TextArea";
import { PeopleSettingsContextInterface } from "../../contexts/PeopleSettingsContext";
import EditableTag from "../../components/tags/EditableTag";
import PersonField from "./PersonField";

const _get_column_fields = (
  field: keyof Appointment,
  filterFunction?: Function
) => {
  const fields = {
    dataIndex: field,
    key: field,
    sorter: (firstAppointment: Appointment, secondAppointment: Appointment) =>
      sortByField(firstAppointment, secondAppointment, field)
  };

  if (filterFunction) {
    return {
      ...fields,
      onFilter: (value: string, record: Appointment) =>
        filterFunction(record, value, field)
    };
  } else {
    return fields;
  }
};

const _get_tag_fields = (
  possibleValues: string[],
  field: string,
  updateAppointment: Function
) => ({
  filters: arrayToAntdMappings(possibleValues),
  render: (value: string, record: Appointment) => (
    <EditableTag
      possibleTags={possibleValues}
      onTagChange={(newValue: string) =>
        updateAppointment(record, field, newValue)
      }
    >
      {value}
    </EditableTag>
  )
});

export const AppointmentColumns = (
  { updateAppointment }: AppointmentsContextInterface,
  { settings }: PeopleSettingsContextInterface
) => [
  {
    title: "איש חוץ",
    ..._get_column_fields("person"),
    sorter: (firstAppointment: Appointment, secondAppointment: Appointment) =>
      sortByField(
        firstAppointment.person,
        secondAppointment.person,
        "fullName"
      ),
    onFilter: (value: string, record: Appointment) =>
      stringsFilterByField(record.person, value, "fullName"),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Appointment) => (
      <PersonField person={record.person} />
    )
  },
  {
    title: "תקופה",
    ..._get_column_fields("phase", stringsFilterByField),
    ..._get_tag_fields(settings.possiblePhases, "phase", updateAppointment)
  },
  {
    title: "שבוע",
    ..._get_column_fields("week", simpleFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "מזמין",
    ..._get_column_fields("invitor", stringsFilterByField),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Appointment) => (
      <EditableText
        initialValue={value}
        onChange={(newValue: string) => {
          updateAppointment(record, "invitor", newValue);
        }}
      />
    )
  },
  {
    title: "מיטה",
    ..._get_column_fields("bedStatus", stringsFilterByField),
    ..._get_tag_fields(
      settings.possibleBedStatus,
      "bedStatus",
      updateAppointment
    )
  },
  {
    title: "אישור כניסה",
    ..._get_column_fields("entryStatus", stringsFilterByField),
    ..._get_tag_fields(
      settings.possibleEntryStates,
      "entryStatus",
      updateAppointment
    )
  },
  {
    title: "מצב מהקישור",
    ..._get_column_fields("makishur", simpleFilterByField),
    filters: ANTD_BOOLEAN_FILTERS,
    render: (value: string, record: Appointment) => (
      <Checkbox
        onClick={() => updateAppointment(record, "makishur", !record.makishur)}
        checked={record.makishur}
      />
    )
  },
  {
    title: "מזמין מה קישור",
    ..._get_column_fields("makishurInvitor", stringsFilterByField),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Appointment) => (
      <EditableText
        initialValue={value}
        onChange={(newValue: string) => {
          updateAppointment(record, "makishurInvitor", newValue);
        }}
      />
    )
  },
  {
    title: "מסלול",
    ..._get_column_fields("track", stringsFilterByField),
    ..._get_tag_fields(settings.possibleTracks, "track", updateAppointment)
  },
  {
    title: "סיבה",
    ..._get_column_fields("reason", stringsFilterByField),
    ..._get_tag_fields(
      settings.possibleAppointmentReasons,
      "reason",
      updateAppointment
    )
  },
  {
    title: "הערות",
    ..._get_column_fields("remarks", stringsFilterByField),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Appointment) => (
      <EditableText
        InputType={TextArea}
        initialValue={value}
        onChange={newValue => {
          updateAppointment(record, "remarks", newValue);
        }}
      />
    )
  },
  {
    title: "",
    dataIndex: "",
    key: "actions",
    render: (text: string, record: Appointment) => (
      <AppointmentDeleteButton appointment={record} />
    )
  }
];
