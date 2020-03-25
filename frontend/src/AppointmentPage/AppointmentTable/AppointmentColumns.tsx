import { sortByField } from "../../utils/sorters";
import { stringsFilterByField } from "../../utils/filters";
import TableTextFilter from "../../components/filters/TableTextFilter";
import { Appointment } from "../../types/appointment";

export const AppointmentColumns = [
  {
    title: "איש חוץ",
    dataIndex: "person",
    key: "person",
    sorter: (firstAppointment: Appointment, secondAppointment: Appointment) =>
      sortByField(
        firstAppointment.person,
        secondAppointment.person,
        "fullName"
      ),
    onFilter: (value: string, record: Appointment) =>
      stringsFilterByField(record.person, value, "fullName"),
    filterDropdown: TableTextFilter,
    render: (value: string, record: Appointment) => record.person.fullName,
    width: "15em"
  }
];
