import { PersonInterface } from "../api/people";

export const sortById = (
  firstPerson: PersonInterface,
  secondPerson: PersonInterface
): number => sortByField(firstPerson, secondPerson, 'personId')

export const sortByName = (
  firstPerson: PersonInterface,
  secondPerson: PersonInterface
): number => sortByField(firstPerson, secondPerson, 'fullName')


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
