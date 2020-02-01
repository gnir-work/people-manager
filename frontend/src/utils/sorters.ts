import { PersonInterface } from "../api/types";

/**
 * Compares between two person objects by their ID,
 * @param firstPerson 
 * @param secondPerson 
 */
export const sortById = (
  firstPerson: PersonInterface,
  secondPerson: PersonInterface
): number => sortByField(firstPerson, secondPerson, 'personId')

/**
 * Compares between two person objects by their name.
 * @param firstPerson 
 * @param secondPerson 
 */
export const sortByName = (
  firstPerson: PersonInterface,
  secondPerson: PersonInterface
): number => sortByField(firstPerson, secondPerson, 'fullName')


export const sortByWeek = (
  firstPerson: PersonInterface,
  secondPerson: PersonInterface
): number => sortByField(firstPerson, secondPerson, 'week')

/**
 * Compares between two person objects by a specific field.
 * @param firstPerson 
 * @param secondPerson 
 * @param field The field name by which the objects should be compared
 */
const sortByField = (
  firstPerson: PersonInterface,
  secondPerson: PersonInterface,
  field: keyof PersonInterface
): number => {
  if (firstPerson[field] > secondPerson[field]) {
    return 1;
  } else if (firstPerson[field] < secondPerson[field]) {
    return -1;
  } else {
    return 0;
  }
};
