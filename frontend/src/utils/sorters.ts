import { Person } from "../types/person";

/**
 * Compares between two person objects by a specific field.
 * @param firstPerson
 * @param secondPerson
 * @param field The field name by which the objects should be compared
 */
export const sortByField = (
  firstPerson: Person,
  secondPerson: Person,
  field: keyof Person
): number => {
  if (firstPerson[field] > secondPerson[field]) {
    return 1;
  } else if (firstPerson[field] < secondPerson[field]) {
    return -1;
  } else {
    return 0;
  }
};
