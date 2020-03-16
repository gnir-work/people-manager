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
export type ConditionalProps<T, Condition> = {
  [P in keyof T]: T[P] extends Condition ? P : never;
}[keyof T];

/**
 * Returns the type of a given array, for example:
 * getElementType<string[]> == string
 */
export type getElementType<T extends Array<any>> = T extends (infer U)[]
  ? U
  : never;
