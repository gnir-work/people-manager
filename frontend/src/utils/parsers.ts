import moment, { Moment } from "moment";
import { SerializedAppointment, Appointment } from "../types/appointment";

const parseDate = (date: number): Moment => moment(date);

export const parseAppointment = (
  appointment: SerializedAppointment
): Appointment => ({
  ...appointment,
  from: parseDate(appointment.from),
  to: parseDate(appointment.to)
});
