import axios from "axios";
import { Person, PersonFields } from "../types/person";

export const getPeople = (): Promise<Person[]> =>
  axios
    .get("/api/people/person")
    .then(people => people.data.map((person: Person) => new Person(person)));

export const updatePersonRequest = <K extends keyof Person>(
  personId: string,
  field: K,
  value: Person[K]
) => axios.put(`/api/people/person/${personId}`, { [field]: value });

export const deletePersonRequest = (personId: string) =>
  axios.delete(`/api/people/person/${personId}`);

export const createPersonRequest = (person: PersonFields) =>
  axios.post("/api/people/person", person);
