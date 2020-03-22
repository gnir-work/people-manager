import _ from "lodash";

import { Person } from "../types/person";

export const getPeople = (): Promise<Person[]> =>
  fetch("/api/people/person")
    .then(data => data.json())
    .then(people => people.map((person: Person) => new Person(person)));
