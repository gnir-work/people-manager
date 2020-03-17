export const personStatuses = ["אזרח", "חייל"];

export const personPreferences = ["בדיקת תרגילים", "הרצאות", "להישאר לישון"];

export const megamut = ["מערכות", "מחקר", "מקורות"];

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
