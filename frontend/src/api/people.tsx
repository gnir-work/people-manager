import _ from "lodash";

import { Person } from "../types/person";
import {
  PERSON_PREFERENCES,
  PERSON_STATUSES,
  TRACKS,
  SUBJECTS,
  AVAILABILITY
} from "../consts";

const getRandomNumberOfItemsFromList = (data: any[]) =>
  data.slice(0, _.random(0, data.length));

export const getPeople = (): Promise<Person[]> =>
  fetch("/api/people/person")
    .then(data => data.json())
    .then(people => people.map((person: Person) => new Person(person)));
