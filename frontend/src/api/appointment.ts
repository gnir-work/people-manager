import axios, { AxiosResponse } from "axios";
import { Appointment, SerializedAppointment } from "../types/appointment";
import { parseAppointment } from "../utils/parsers";
import { serializeAppointment } from "../utils/serializers";

export const getAppointments = (): Promise<Appointment[]> =>
  axios
    .get("/api/appointments/appointment")
    .then((response: AxiosResponse<SerializedAppointment[]>) =>
      response.data.map(parseAppointment)
    );

export const updateAppointmentRequest = <K extends keyof Appointment>(
  appointment: Appointment,
  field: K,
  value: Appointment[K]
) => {
  const serializedValue = serializeAppointment({
    ...appointment,
    [field]: value
  })[field];
  return axios.put(`/api/appointments/appointment/${appointment.id}`, {
    [field]: serializedValue
  });
};

export const deleteAppointmentRequest = (appointmentId: string) =>
  axios.delete(`/api/appointments/appointment/${appointmentId}`);

export const createAppointmentRequest = (
  appointment: Omit<Appointment, "id">
) => {
  const serializedAppointment = serializeAppointment(appointment);
  return axios.post("/api/appointments/appointment", serializedAppointment);
};
