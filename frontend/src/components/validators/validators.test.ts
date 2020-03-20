import { onlyHebrewCharacters } from "./validators";

const HEBREW_CHARACTERS = "שלום";
const ENGLISH_CHARACTERS = "hello";

describe.each`
  characters                                | expected | message
  ${ENGLISH_CHARACTERS}                     | ${false} | ${"Only english characters"}
  ${HEBREW_CHARACTERS}                      | ${true}  | ${"Only hebrew characters"}
  ${ENGLISH_CHARACTERS + HEBREW_CHARACTERS} | ${false} | ${"Mix of english and hebrew"}
  ${HEBREW_CHARACTERS + " "}                | ${true}  | ${"Hebrew characters and space"}
  ${ENGLISH_CHARACTERS + " "}               | ${false} | ${"English characters and space"}
`("Checking $characters", ({ characters, expected, message }) => {
  it(message, () => {
    expect(onlyHebrewCharacters(characters)).toBe(expected);
  });
});
