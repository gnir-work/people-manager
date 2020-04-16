/**
 * Settings configured hard coded in consts.ts.
 * Currently only hard coded settings can be colored.
 */
export interface StaticSettings {
  possibleStatuses: string[];
  possibleAvailabilities: string[];
  possibleEntryStates: string[];
  possibleBedStatus: string[];
  possiblePhases: string[];
}

/**
 * Dynamic settings that are expected to change at least ones through out the course.
 * This settings can be edited dynamically but cannot be assigned a color.
 */
export interface DynamicSettings {
  possibleSubjects: string[];
  possibleTracks: string[];
  possiblePreferences: string[];
  possibleAppointmentReasons: string[];
  possibleCourses: string[];
}

export default interface SiteSettings extends StaticSettings, DynamicSettings {}
