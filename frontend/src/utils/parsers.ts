import moment, { Moment } from "moment";
import { SerializedAppointment, Appointment } from "../types/appointment";

const parseDates = ([from, to]: [number, number]): [Moment, Moment] => [
  moment(from),
  moment(to)
];

export const parseAppointment = (
  appointment: SerializedAppointment
): Appointment => ({
  ...appointment,
  dates: parseDates(appointment.dates)
});
