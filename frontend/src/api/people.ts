import axios from "axios";
import { Person } from "../types/person";

export const getPeople = (): Promise<Person[]> =>
  axios
    .get("/api/people/person")
    .then(people => people.data.map((person: Person) => new Person(person)));

export const updatePersonRequest = <K extends keyof Person>(
  personId: string,
  field: K,
  value: Person[K]
) => axios.put(`/api/people/person/${personId}`, { [field]: value });
