import { Person } from "../types/person";
import { ConditionalProps, getElementType } from "./types";
import moment, { Moment } from "moment";

/**
 * Checks if the person value of the property key contains the given value.
 * Please notice: the check ignores case.
 * @param person The person that should be filtered.
 * @param text The value that should be part of the fields value.
 * @param field The field to check against
 */
export const stringsFilterByField = (
  person: Person,
  text: string,
  field: ConditionalProps<Person, string>
) => person[field].toLowerCase().includes(text.toLowerCase());

/**
 * Checks wether the persons date field is within the range given.
 * Please notice the range is inclusive on both ends (since and until).
 * @param person The person that should be filtered.
 * @param datesRange The dates range by which we will filter
 * @param field The date field that will be filtered.
 */
export const datesFilterByField = (
  person: Person,
  datesRange: { since: Moment; until: Moment },
  field: ConditionalProps<Person, moment.Moment>
) =>
  datesRange.since.startOf("day") <= person[field] &&
  person[field] <= datesRange.until.endOf("day");

export function arrayFilterByField<
  K extends ConditionalProps<Person, Array<any>>
>(person: Person, value: getElementType<Person[K]>, field: K) {
  return (person[field] as any).includes(value);
}

/**
 * Convert an array of literals to antd filters format.
 * @param filters
 */
export const arrayToAntdMappings = (filters: string[]) =>
  filters.map((value: string) => ({
    text: value,
    value
  }));
