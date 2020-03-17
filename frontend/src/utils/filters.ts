import _ from "lodash";
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
 * Checks if the person value of the property key is equal.
 * @param person The person that should be filtered.
 * @param value The numeric value as a string
 * @param field The field to check against.
 */
export const numbersFilterByField = (
  person: Person,
  value: string,
  field: ConditionalProps<Person, number>
) => person[field] === parseInt(value);

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
  return person[field].includes(value);
}

/**
 * Convert a dict of mappings to antd filters format.
 * @param filters An dict mapping between the value and the text that should be shown in the filter.
 */
export const enumMappingToAntdFilters = (filters: { [key: number]: string }) =>
  _.keys(filters).map((value: string) => ({
    text: filters[parseInt(value)],
    value
  }));
