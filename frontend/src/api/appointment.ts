import axios from "axios";
import { Appointment } from "../types/appointment";
import { Person } from "../types/person";
import moment, { Moment } from "moment";

export const getAppointments = (): Promise<Appointment[]> =>
  axios.get("/api/appointments/appointment").then(appointments =>
    appointments.data.map((appointment: Appointment) => {
      const person = new Person(appointment.person);
      const dates: [Moment, Moment] = [
        moment(appointment.dates[0]),
        moment(appointment.dates[1])
      ];
      return new Appointment({ ...appointment, person, dates });
    })
  );

export const updateAppointmentRequest = <K extends keyof Appointment>(
  appointmentId: string,
  field: K,
  value: Appointment[K]
) => {
  let serializedValue = undefined;
  if (field === "person") {
    serializedValue = (value as any).id;
  } else if (field === "dates") {
    serializedValue = [
      (value as any)[0].valueOf(),
      (value as any)[1].valueOf()
    ];
  } else {
    serializedValue = value;
  }
  return axios.put(`/api/appointments/appointment/${appointmentId}`, {
    [field]: serializedValue
  });
};

export const deleteAppointmentRequest = (appointmentId: string) =>
  axios.delete(`/api/appointments/appointment/${appointmentId}`);

export const createAppointmentRequest = (appointment: Appointment) =>
  axios.post("/api/appointments/appointment", appointment);
