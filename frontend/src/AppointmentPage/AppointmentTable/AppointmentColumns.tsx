import React from "react";
import { sortByField } from "../../utils/sorters";
import { stringsFilterByField, simpleFilterByField } from "../../utils/filters";
import TableTextFilter from "../../components/filters/TableTextFilter";
import { Appointment } from "../../types/appointment";
import { ANTD_BOOLEAN_FILTERS } from "../../consts";
import { AppointmentsContextInterface } from "../../contexts/AppointmentContext";
import EditableText from "../../components/text/EditableText";
import TextArea from "antd/lib/input/TextArea";
import { PeopleSettingsContextInterface } from "../../contexts/PeopleSettingsContext";
import EditablePersonAutoComplete from "../../components/fields/PersonAutoComplete/EditablePersonAutoComplete";
import DateRangeField from "../../components/fields/DateRangeField";
import { get_column_fields, get_tag_fields } from "../../utils/column_helpers";
import BooleanField from "../../components/fields/BooleanField";
import DeleteButton from "../../components/actions/DeleteButton";

export const AppointmentColumns = (
  { updateAppointment, deleteAppointment }: AppointmentsContextInterface,
  { settings }: PeopleSettingsContextInterface
) => [
  {
    title: "איש חוץ",
    ...get_column_fields("person"),
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
      <EditablePersonAutoComplete
        currentPerson={record.person}
        onChange={newPerson => {
          updateAppointment(record, "person", newPerson);
        }}
      />
    )
  },
  {
    title: "תקופה",
    ...get_column_fields("phase", stringsFilterByField),
    ...get_tag_fields(settings.possiblePhases, "phase", updateAppointment)
  },
  {
    title: "שבוע",
    ...get_column_fields("week", simpleFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "תאריכים",
    render: (value: string, record: Appointment) => (
      <DateRangeField
        dates={record.dates}
        onChange={newDates => {
          updateAppointment(record, "dates", newDates);
        }}
      />
    )
  },

  {
    title: "מזמין",
    ...get_column_fields("invitor", stringsFilterByField),
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
    ...get_column_fields("bedStatus", stringsFilterByField),
    ...get_tag_fields(
      settings.possibleBedStatus,
      "bedStatus",
      updateAppointment
    )
  },
  {
    title: "אישור כניסה",
    ...get_column_fields("entryStatus", stringsFilterByField),
    ...get_tag_fields(
      settings.possibleEntryStates,
      "entryStatus",
      updateAppointment
    )
  },
  {
    title: "מצב מהקישור",
    ...get_column_fields("makishur", simpleFilterByField),
    filters: ANTD_BOOLEAN_FILTERS,
    render: (value: string, record: Appointment) => (
      <BooleanField
        onChange={newValue => updateAppointment(record, "makishur", newValue)}
        checked={record.makishur}
      />
    )
  },
  {
    title: "מזמין מה קישור",
    ...get_column_fields("makishurInvitor", stringsFilterByField),
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
    ...get_column_fields("track", stringsFilterByField),
    ...get_tag_fields(settings.possibleTracks, "track", updateAppointment)
  },
  {
    title: "סיבה",
    ...get_column_fields("reason", stringsFilterByField),
    ...get_tag_fields(
      settings.possibleAppointmentReasons,
      "reason",
      updateAppointment
    )
  },
  {
    title: "הערות",
    ...get_column_fields("remarks", stringsFilterByField),
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
      <DeleteButton
        confirmationMessage={`למחוק את הזימון של ${record.person.fullName}?`}
        onDelete={() => deleteAppointment(record)}
      />
    )
  }
];
