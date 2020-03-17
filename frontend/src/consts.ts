import { PersonStatuses, PersonPreference } from "./types/person";
import { Megama } from "./types/organization";

export const personStatusToText = {
  [PersonStatuses.Citizen]: "אזרח",
  [PersonStatuses.Soldier]: "חייל"
};

export const personPreferenceToText = {
  [PersonPreference.ExerciseChecking]: "בדיקת תרגילים",
  [PersonPreference.Lectures]: "הרצאות",
  [PersonPreference.StayOverNight]: "להישאר לישון"
};

export const megamaToText = {
  [Megama.Maarachot]: "מערכות",
  [Megama.Mehkar]: "מחקר",
  [Megama.Mekorot]: "מקורות"
};
