import React from "react";
import { sortByField } from "../../utils/sorters";
import { stringsFilterByField } from "../../utils/filters";
import TableTextFilter from "../../components/filters/TableTextFilter";
import { Appointment } from "../../types/appointment";
import { Checkbox } from "antd";
import { ANTD_BOOLEAN_FILTERS } from "../../consts";

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

export const AppointmentColumns = [
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
    render: (value: string, record: Appointment) => record.person.fullName
  },
  {
    title: "תקופה",
    ..._get_column_fields("phase", stringsFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "שבוע",
    ..._get_column_fields("week"),
    onFilter: (value: string, record: Appointment) =>
      record.week === parseInt(value),
    filterDropdown: TableTextFilter
  },
  {
    title: "מזמין",
    ..._get_column_fields("invitor", stringsFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "מיטה",
    ..._get_column_fields("bedStatus", stringsFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "אישור כניסה",
    ..._get_column_fields("entryStatus", stringsFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "מצב מהקישור",
    ..._get_column_fields("makishur", stringsFilterByField),
    filters: ANTD_BOOLEAN_FILTERS,
    onFilter: (makishur: string, record: Appointment) =>
      String(record.makishur) === makishur,
    render: (value: string, record: Appointment) => (
      <Checkbox value={record.makishur} />
    )
  },
  {
    title: "מזמין מה קישור",
    ..._get_column_fields("makishurInvitor", stringsFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "מסלול",
    ..._get_column_fields("track", stringsFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "סיבה",
    ..._get_column_fields("reason", stringsFilterByField),
    filterDropdown: TableTextFilter
  },
  {
    title: "הערות",
    ..._get_column_fields("remarks", stringsFilterByField),
    filterDropdown: TableTextFilter
  }
];
