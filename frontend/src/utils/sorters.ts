import { Person as K } from "../types/person";

/**
 * Compares between two data objects by a specific field.
 * @param field The field name by which the objects should be compared
 */
export const sortByField = <K>(
  firstData: K,
  secondData: K,
  field: keyof K
): number => {
  if (firstData[field] > secondData[field]) {
    return 1;
  } else if (firstData[field] < secondData[field]) {
    return -1;
  } else {
    return 0;
  }
};
