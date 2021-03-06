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

export const GET_REQUIRED_RULE = (errorMessage: string) => ({
  required: true,
  message: errorMessage
});

export const GET_PERSONAL_ID_RULES = (): Rule[] => [
  GET_REQUIRED_RULE("בבקשה הכנס מספר אישי"),
  {
    message: "המספר אישי חייב להכיל רק מספרים",
    transform: (value: string) => _.toNumber(value),
    type: "number"
  }
];

export const GET_BASIC_TEXT_RULES = (): Rule[] => [
  GET_REQUIRED_RULE("בבקשה הכנס שם מלא"),
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
  GET_REQUIRED_RULE("בבקשה הכנס מספר פלאפון"),
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

export const GET_WEEK_NUMBER_RULES = (): Rule[] => [
  GET_REQUIRED_RULE("בבקשה הכנס שבוע בקורס"),
  {
    message: "המספר פלאפון חייב להכיל רק מספרים",
    transform: value => _.toNumber(value),
    type: "number"
  }
];
