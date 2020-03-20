import { ALLOWED_CHARACTERS } from "./consts";
import _ from "lodash";

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
