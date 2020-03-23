export interface PersonFields {
  fullName: string;
  personalId: string;
  phone: string;
  status: string;
  team: string;
  tracks: string[];
  subjects: string[];
  availability: string;
  wasSegel?: boolean;
  remarks?: string;
  preferences?: string[];
}

export class Person {
  readonly id: string;
  fullName: string;
  personalId: string;
  phone: string;
  status: string;
  team: string;
  remarks: string;
  preferences: string[];
  tracks: string[];
  subjects: string[];
  availability: string;
  wasSegel: boolean;

  constructor(args: PersonFields) {
    this.id = args.personalId;
    this.fullName = args.fullName;
    this.personalId = args.personalId;
    this.phone = args.phone;
    this.status = args.status;
    this.team = args.team;
    this.remarks = args.remarks || "";
    this.preferences = args.preferences || [];
    this.tracks = args.tracks || [];
    this.subjects = args.subjects || [];
    this.availability = args.availability || "";
    this.wasSegel = args.wasSegel || false;
  }
}
