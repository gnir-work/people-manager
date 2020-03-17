import { Megama } from "./organization";

export enum PersonPreference {
  StayOverNight = "StayOverNight",
  Lectures = "Lectures",
  ExerciseChecking = "ExerciseChecking"
}

export enum PersonStatuses {
  Soldier = "Soldier",
  Citizen = "Citizen"
}

interface PersonArguments {
  fullName: string;
  personalId: string;
  phone: string;
  status: PersonStatuses;
  team: string;
  remarks?: string;
  preferences?: PersonPreference[];
  megamut: Megama[];
}

export class Person {
  readonly id: string;
  fullName: string;
  personalId: string;
  phone: string;
  status: PersonStatuses;
  team: string;
  remarks: string;
  preferences: PersonPreference[];
  megamut: Megama[];

  constructor(args: PersonArguments) {
    this.id = args.personalId;
    this.fullName = args.fullName;
    this.personalId = args.personalId;
    this.phone = args.phone;
    this.status = args.status;
    this.team = args.team;
    this.remarks = args.remarks || "";
    this.preferences = args.preferences || [];
    this.megamut = args.megamut || [];
  }
}
