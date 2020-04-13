import { Moment } from "moment";
import { Person } from "../types/person";
import { Appointment, AppointmentFields } from "../types/appointment";

const serializeDates = ([from, to]: [Moment, Moment]) => [
  from.valueOf(),
  to.valueOf()
];

const serializePerson = (person: Person) => person.id;

export const serializeAppointment = <K extends AppointmentFields>(
  appointment: K
) => ({
  ...appointment,
  dates: serializeDates(appointment.dates),
  person: serializePerson(appointment.person)
});
