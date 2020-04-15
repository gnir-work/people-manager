import { compareJsonSchema } from "./equality";

describe.each`
  oldObject               | newObject         | expected | message
  ${{ a: 1 }}             | ${{ a: 1 }}       | ${true}  | ${"Single key same Objects"}
  ${{ a: 1 }}             | ${{ b: 1 }}       | ${false} | ${"Single key different keys"}
  ${{ a: 1 }}             | ${{ a: 2 }}       | ${true}  | ${"Single key different values"}
  ${{ a: 1, b: 2 }}       | ${{ a: 2, b: 2 }} | ${true}  | ${"Multiple keys same order"}
  ${{ a: 1, b: 2 }}       | ${{ b: 2, a: 2 }} | ${true}  | ${"Multiple keys different order"}
  ${{ a: 1, b: 2 }}       | ${{ c: 2, a: 2 }} | ${false} | ${"Multiple keys different keys"}
  ${{ a: 1, b: 2, c: 3 }} | ${{ c: 2, a: 2 }} | ${false} | ${"Multiple keys different length"}
`(
  "Checking $oldObject === $newObject",
  ({ oldObject, newObject, expected, message }) => {
    it(message, () => {
      expect(compareJsonSchema(oldObject, newObject)).toBe(expected);
    });
  }
);
