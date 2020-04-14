import { ConditionalProps, getElementType } from "./types";

/**
 * Basically include function which ignores case.
 */
export const filterStringIgnoringCasing = (data: string, filter: string) =>
  data.toLowerCase().includes(filter.toLowerCase());

/**
 * Run a simple comparison.
 * This function helps simplify the configuration of antd columns.
 */
export const simpleFilterByField = <K extends { [key: string]: any }>(
  data: K,
  value: boolean | number,
  field: ConditionalProps<K, boolean | number>
  // This is on purpose in order to allow string to number comparison.
  // eslint-disable-next-line
) => data[field] == value;

/**
 * Checks if the value of the property key contains the given value.
 * Please notice: the check ignores case.
 */
export const stringsFilterByField = <K extends { [key: string]: any }>(
  data: K,
  text: string,
  field: ConditionalProps<K, string>
) => filterStringIgnoringCasing(data[field], text);

export function arrayFilterByField<K extends { [key: string]: any }>(
  data: K,
  value: getElementType<K[ConditionalProps<K, Array<any>>]>,
  field: ConditionalProps<K, Array<any>>
) {
  return data[field].includes(value);
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
