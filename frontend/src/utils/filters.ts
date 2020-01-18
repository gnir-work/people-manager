import { PersonInterface } from "../api/people";
import { ConditionalProps } from "./types";


/**
 * Checks if the person value of the property key contains the given value.
 * @param person The person that should be filtered.
 * @param value The value that should be part of the fields value.
 * @param field The field to check againts
 */
export const stringsFilterByField = (
    person: PersonInterface,
    value: string,
    field: ConditionalProps<PersonInterface, string>
) => person[field].toLowerCase().includes(value.toLowerCase())


export const numbersFilterByField = (
    person: PersonInterface,
    value: number,
    field: ConditionalProps<PersonInterface, number>
) => person[field] === value