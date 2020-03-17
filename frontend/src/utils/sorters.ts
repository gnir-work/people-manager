import { Person } from "../types/person";

export const sortById = (firstPerson: Person, secondPerson: Person): number =>
  sortByField(firstPerson, secondPerson, "personalId");

export const sortByName = (firstPerson: Person, secondPerson: Person): number =>
  sortByField(firstPerson, secondPerson, "fullName");

export const sortByTeam = (firstPerson: Person, secondPerson: Person): number =>
  sortByField(firstPerson, secondPerson, "team");

/**
 * Compares between two person objects by a specific field.
 * @param firstPerson
 * @param secondPerson
 * @param field The field name by which the objects should be compared
 */
const sortByField = (
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
