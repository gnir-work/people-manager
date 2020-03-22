export const PERSON_STATUSES = ["אזרח", "חייל"];

export const PERSON_PREFERENCES = ["בדיקת תרגילים", "הרצאות", "להישאר לישון"];

export const TRACKS = ["מערכות", "מחקר", "מקורות"];

export const SUBJECTS = ["python", "C", "ביטים"];

export const AVAILABILITY = ["לא זמין", "זמין אבל עמוס", "זמין"];

export const STATUS_TO_COLOR: {
  [key: string]: string;
} = {
  אזרח: "blue",
  חייל: "green"
};

export const PREFERENCE_TO_COLOR: {
  [key: string]: string;
} = {
  "בדיקת תרגילים": "magenta",
  הרצאות: "geekblue",
  "להישאר לישון": "volcano"
};

export const TRACKS_TO_COLOR: {
  [key: string]: string;
} = {
  מערכות: "green",
  מקורות: "orange",
  מחקר: "purple"
};

export const AVAILABILITY_TO_COLOR = {
  "לא זמין": "red",
  "זמין אבל עמוס": "orange",
  זמין: "green"
};

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

export const EDIT_SUCCESS_MESSAGE = "שדה עודכן בהצלחה.";
