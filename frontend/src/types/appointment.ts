import { Person, SerializedPerson } from "./person";
import { Moment } from "moment";
import BasicData from "./data";

export interface Appointment extends BasicData {
  person: Person;
  phase: string;
  week: number;
  from: Moment;
  to: Moment;
  invitor: string;
  bedStatus: string;
  entryStatus: string;
  makishur: boolean;
  makishurInvitor: string;
  track: string;
  reason: string;
  remarks: string;
}

export interface SerializedAppointment
  extends Omit<Appointment, "person" | "from" | "to"> {
  person: SerializedPerson;
  from: number;
  to: number;
}

export type AppointmentFields = Omit<Appointment, "id">;
