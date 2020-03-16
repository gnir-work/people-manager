import { PersonStatuses } from "./types/person";

export const personStatusToText = {
  [PersonStatuses.Citizen]: "אזרח",
  [PersonStatuses.Soldier]: "חייל"
};
