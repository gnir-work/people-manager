import axios from "axios";
import { Appointment } from "../types/appointment";

export const getAppointments = (): Promise<Appointment[]> =>
  axios
    .get("/api/appointments/appointment")
    .then(appointments =>
      appointments.data.map(
        (appointment: Appointment) => new Appointment(appointment)
      )
    );

export const updateAppointmentRequest = <K extends keyof Appointment>(
  appointmentId: string,
  field: K,
  value: Appointment[K]
) =>
  axios.put(`/api/appointments/appointment/${appointmentId}`, {
    [field]: value
  });

export const deleteAppointmentRequest = (appointmentId: string) =>
  axios.delete(`/api/appointments/appointment/${appointmentId}`);

export const createAppointmentRequest = (appointment: Appointment) =>
  axios.post("/api/appointments/appointment", appointment);
