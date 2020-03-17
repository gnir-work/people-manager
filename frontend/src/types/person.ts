interface PersonArguments {
  fullName: string;
  personalId: string;
  phone: string;
  status: string;
  team: string;
  remarks?: string;
  preferences?: string[];
  megamut: string[];
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
  megamut: string[];

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
