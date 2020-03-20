import { ALLOWED_CHARACTERS, MIN_PHONE_LENGTH } from "./consts";
import _ from "lodash";
import { Rule } from "antd/lib/form";

/**
 * Checks if value contains only hebrew characters
 * @param value The string to check.
 */
export const onlyHebrewCharacters = (value: string): boolean => {
  for (const character of value) {
    if (!ALLOWED_CHARACTERS.includes(character)) {
      return false;
    }
  }
  return true;
};

// From here down you can find antd rules for validating fields.

export const GET_PERSONAL_ID_RULES = (doesPersonExist: Function): Rule[] => [
  { required: true, message: "בבקשה הכנס מספר אישי" },
  {
    validator(rule: any, value: string) {
      if (!doesPersonExist(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject("כבר יש איש חוץ עם המספר אישי הזה");
      }
    }
  },
  {
    message: "המספר אישי חייב להכיל רק מספרים",
    transform: (value: string) => _.toNumber(value),
    type: "number"
  }
];

export const GET_BASIC_TEXT_RULES = (): Rule[] => [
  { required: true, message: "בבקשה הכנס שם מלא" },
  {
    validator(rule, value) {
      if (onlyHebrewCharacters(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject("השם חייב להכין רק תווים בעברית או רווח");
      }
    }
  }
];

export const GET_PHONE_NUMBER_RULES = (): Rule[] => [
  {
    required: true,
    message: "בבקשה הכנס מספר פלאפון"
  },
  {
    message: "המספר פלאפון חייב להכיל רק מספרים",
    transform: value => _.toNumber(value),
    type: "number"
  },
  {
    message: `המספר פלאפון חייב להכין לפחות ${MIN_PHONE_LENGTH} תוים`,
    min: MIN_PHONE_LENGTH
  }
];
