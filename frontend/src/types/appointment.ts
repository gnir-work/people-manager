import { Person } from "./person";
import { Moment } from "moment";

export class Appointment {
  readonly id: string;
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

  constructor(newAppointment: Omit<Appointment, "id">) {
    this.id = [
      newAppointment.person.personalId,
      newAppointment.from.utc().toString(),
      newAppointment.to.utc().toString()
    ].join("-");
    this.person = newAppointment.person;
    this.phase = newAppointment.phase;
    this.week = newAppointment.week;
    this.from = newAppointment.from;
    this.to = newAppointment.to;
    this.invitor = newAppointment.invitor;
    this.bedStatus = newAppointment.bedStatus;
    this.entryStatus = newAppointment.entryStatus;
    this.makishur = newAppointment.makishur;
    this.makishurInvitor = newAppointment.makishurInvitor;
    this.track = newAppointment.track;
    this.reason = newAppointment.reason;
    this.remarks = newAppointment.remarks;
  }
}
