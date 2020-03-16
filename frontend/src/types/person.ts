export enum PersonPreferences {
  StayOverNight,
  Lectures,
  ExerciseChecking
}

export enum PersonStatuses {
  Soldier,
  Citizen
}

interface PersonArguments {
  fullName: string;
  personalId: string;
  status: PersonStatuses;
  team: string;
  remarks?: string;
  preferences?: PersonPreferences[];
}

export class Person {
  readonly id: string;
  fullName: string;
  personalId: string;
  status: PersonStatuses;
  team: string;
  remarks: string;
  preferences: PersonPreferences[];

  constructor(args: PersonArguments) {
    this.id = args.personalId;
    this.fullName = args.fullName;
    this.personalId = args.personalId;
    this.status = args.status;
    this.team = args.team;
    this.remarks = args.remarks || "";
    this.preferences = args.preferences || [];
  }
}
