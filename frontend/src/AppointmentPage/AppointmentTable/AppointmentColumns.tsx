import React from "react";
import { sortByField } from "../../utils/sorters";
import { stringsFilterByField, simpleFilterByField } from "../../utils/filters";
import TableTextFilter from "../../components/filters/TableTextFilter";
import { Appointment } from "../../types/appointment";
import { ANTD_BOOLEAN_FILTERS } from "../../consts";
import EditableText from "../../components/text/EditableText";
import TextArea from "antd/lib/input/TextArea";
import { PeopleSettingsContextInterface } from "../../contexts/PeopleSettingsContext";
import EditablePersonAutoComplete from "../../components/fields/PersonAutoComplete/EditablePersonAutoComplete";
import DateRangeField from "../../components/fields/DateRangeField";
import {
  get_column_fields,
  get_tag_fields,
  get_text_fields
} from "../../utils/column_helpers";
import BooleanField from "../../components/fields/BooleanField";
import DeleteButton from "../../components/actions/DeleteButton";
import { AppointmentsContextInterface } from "../../contexts/AppointmentContext";

export const AppointmentColumns = (
  updateAppointment: AppointmentsContextInterface["updateData"],
  deleteAppointment: AppointmentsContextInterface["deleteData"],
  { settings }: PeopleSettingsContextInterface
) => [
  {
    title: "איש חוץ",
    ...get_column_fields<Appointment>("person"),
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
    ...get_column_fields<Appointment>("phase", stringsFilterByField),
    ...get_tag_fields<Appointment>(
      settings.possiblePhases,
      "phase",
      updateAppointment
    )
  },
  {
    title: "שבוע",
    ...get_column_fields<Appointment>("week", simpleFilterByField),
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
    ...get_column_fields<Appointment>("invitor", stringsFilterByField),
    ...get_text_fields<Appointment>("invitor", [], updateAppointment)
  },
  {
    title: "מיטה",
    ...get_column_fields<Appointment>("bedStatus", stringsFilterByField),
    ...get_tag_fields<Appointment>(
      settings.possibleBedStatus,
      "bedStatus",
      updateAppointment
    )
  },
  {
    title: "אישור כניסה",
    ...get_column_fields<Appointment>("entryStatus", stringsFilterByField),
    ...get_tag_fields<Appointment>(
      settings.possibleEntryStates,
      "entryStatus",
      updateAppointment
    )
  },
  {
    title: "מצב מהקישור",
    ...get_column_fields<Appointment>("makishur", simpleFilterByField),
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
    ...get_column_fields<Appointment>("makishurInvitor", stringsFilterByField),
    ...get_text_fields<Appointment>("makishurInvitor", [], updateAppointment)
  },
  {
    title: "מסלול",
    ...get_column_fields<Appointment>("track", stringsFilterByField),
    ...get_tag_fields<Appointment>(
      settings.possibleTracks,
      "track",
      updateAppointment
    )
  },
  {
    title: "סיבה",
    ...get_column_fields<Appointment>("reason", stringsFilterByField),
    ...get_tag_fields<Appointment>(
      settings.possibleAppointmentReasons,
      "reason",
      updateAppointment
    )
  },
  {
    title: "הערות",
    ...get_column_fields<Appointment>("remarks", stringsFilterByField),
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
