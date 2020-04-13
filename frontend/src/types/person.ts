import BasicData from "./data";

export interface Person extends BasicData {
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
}

export type PersonFields = Omit<Person, "id">;
