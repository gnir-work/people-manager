import { Moment } from "moment";
import { Person } from "../types/person";
import { AppointmentFields } from "../types/appointment";

const serializeDate = (date: Moment) => date.valueOf();

const serializePerson = (person: Person) => person.id;

export const serializeAppointment = <K extends AppointmentFields>(
  appointment: K
) => ({
  ...appointment,
  from: serializeDate(appointment.from),
  to: serializeDate(appointment.to),
  person: serializePerson(appointment.person)
});
