import { ConditionalProps, getElementType } from "./types";
import moment, { Moment } from "moment";

interface test {
  a: number;
}

/**
 * Checks if the person value of the property key contains the given value.
 * Please notice: the check ignores case.
 * @param person The person that should be filtered.
 * @param text The value that should be part of the fields value.
 * @param field The field to check against
 */
export const stringsFilterByField = <K extends { [key: string]: any }>(
  person: K,
  text: string,
  field: ConditionalProps<K, string>
) => person[field].toLowerCase().includes(text.toLowerCase());

/**
 * Checks wether the persons date field is within the range given.
 * Please notice the range is inclusive on both ends (since and until).
 * @param person The person that should be filtered.
 * @param datesRange The dates range by which we will filter
 * @param field The date field that will be filtered.
 */
export const datesFilterByField = <K extends { [key: string]: any }>(
  person: K,
  datesRange: { since: Moment; until: Moment },
  field: ConditionalProps<K, moment.Moment>
) =>
  datesRange.since.startOf("day") <= person[field] &&
  person[field] <= datesRange.until.endOf("day");

export function arrayFilterByField<K extends { [key: string]: any }>(
  person: K,
  value: getElementType<K[ConditionalProps<K, Array<any>>]>,
  field: ConditionalProps<K, Array<any>>
) {
  return person[field].includes(value);
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
