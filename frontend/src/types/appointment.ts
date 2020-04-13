import { Person } from "./person";
import { Moment } from "moment";
import BasicData from "./data";

export interface Appointment extends BasicData {
  person: Person;
  phase: string;
  week: number;
  dates: [Moment, Moment];
  invitor: string;
  bedStatus: string;
  entryStatus: string;
  makishur: boolean;
  makishurInvitor: string;
  track: string;
  reason: string;
  remarks: string;
}

export type AppointmentFields = Omit<Appointment, "id">;
