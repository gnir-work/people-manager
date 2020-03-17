export const personStatuses = ["אזרח", "חייל"];

export const personPreferences = ["בדיקת תרגילים", "הרצאות", "להישאר לישון"];

export const megamut = ["מערכות", "מחקר", "מקורות"];

export const subjects = ["python", "C", "ביטים"];

export const availability = ["לא זמין", "זמין אבל עמוס", "זמין"];

export const statusToColor: {
  [key: string]: string;
} = {
  אזרח: "blue",
  חייל: "green"
};

export const preferenceToColor: {
  [key: string]: string;
} = {
  "בדיקת תרגילים": "magenta",
  הרצאות: "geekblue",
  "להישאר לישון": "volcano"
};

export const megamutToColor: {
  [key: string]: string;
} = {
  מערכות: "green",
  מקורות: "orange",
  מחקר: "purple"
};

export const availabilityToColor = {
  "לא זמין": "red",
  "זמין אבל עמוס": "orange",
  זמין: "green"
};

/**
 * Filters for the antd table component that correspond to boolean fields.
 */
export const antdBooleanFilters = [
  {
    text: "כן",
    value: "true"
  },
  {
    text: "לא",
    value: "false"
  }
];
