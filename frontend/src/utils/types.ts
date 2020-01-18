/**
 * Converts an enum into an array of filter options for antd.
 * @param givenEnum The enum that you want to filter.
 */
export const enumToFilterValues = (givenEnum: any) => Object.keys(givenEnum)
    .map((e: string) => ({ text: givenEnum[e], value: givenEnum[e] }))

/**
 * Create a dynamic type which consists of all the properties of given type T 
 * which are of type Condition.
 * For example, Given a type
 * interface Person {
 *    name: string,
 *    agae: number
 * }
 * 
 * ConditionalProps<Person, string> will return a type with only name inside of it.
 */
export type ConditionalProps<T, Condition> = ({ [P in keyof T]: T[P] extends Condition ? P : never })[keyof T];