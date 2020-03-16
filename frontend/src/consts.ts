import { PersonStatuses, PersonPreference } from "./types/person";

export const personStatusToText = {
  [PersonStatuses.Citizen]: "אזרח",
  [PersonStatuses.Soldier]: "חייל"
};

export const personPreferenceToText = {
  [PersonPreference.ExerciseChecking]: "בדיקת תרגילים",
  [PersonPreference.Lectures]: "הרצאות",
  [PersonPreference.StayOverNight]: "לישאר לישון"
};
