import { StaticSettings } from "./types/settings";

/**
 * Filters for the antd table component that correspond to boolean fields.
 */
export const ANTD_BOOLEAN_FILTERS = [
  {
    text: "כן",
    value: "true"
  },
  {
    text: "לא",
    value: "false"
  }
];

/**
 * Messages
 */
export const EDIT_SUCCESS_MESSAGE = "שדה עודכן בהצלחה.";

export const EDIT_ERROR_MESSAGE = "לא ניתן לעדכן את השדה.";

/**
 * Urls
 */
export const PEOPLE_PAGE_URL = "/people";
export const APPOINTMENT_PAGE_URL = "/";

export const LOCATION_TO_ITEM: {
  [key: string]: string;
} = {
  [APPOINTMENT_PAGE_URL]: "1",
  [PEOPLE_PAGE_URL]: "2"
};

/**
 * Settings
 */
export const STATIC_SETTINGS: StaticSettings = {
  possibleAvailabilities: ["זמין", "לא זמין"],
  possibleBedStatus: ["לא צריך", "טרם", "יש"],
  possibleEntryStates: ["יש", "טרם"],
  possiblePhases: ["מכינה", "אחוד"],
  possibleStatuses: ["סדיר", "מילואים", "אעצ", "אזרח"]
};
