import axios from "axios";
import { Person, PersonFields } from "../types/person";

export const getPeople = (): Promise<Person[]> =>
  axios.get("/api/people/person").then(response => response.data);

export const updatePersonRequest = <K extends keyof Person>(
  person: Person,
  field: K,
  value: Person[K]
) => axios.put(`/api/people/person/${person.id}`, { [field]: value });

export const deletePersonRequest = (personId: string) =>
  axios.delete(`/api/people/person/${personId}`);

export const createPersonRequest = (person: PersonFields) =>
  axios.post("/api/people/person", person);
