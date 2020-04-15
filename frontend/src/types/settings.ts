export interface StaticSettings {
  possibleStatuses: string[];
  possibleAvailabilities: string[];
  possibleEntryStates: string[];
  possibleBedStatus: string[];
  possiblePhases: string[];
}

export interface DynamicSettings {
  possibleSubjects: string[];
  possibleTracks: string[];
  possiblePreferences: string[];
  possibleAppointmentReasons: string[];
}

export default interface SiteSettings extends StaticSettings, DynamicSettings {}
