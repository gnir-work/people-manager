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

// The serialized version is the same with the current data.
export interface SerializedPerson extends Person {}

export type PersonFields = Omit<Person, "id">;
