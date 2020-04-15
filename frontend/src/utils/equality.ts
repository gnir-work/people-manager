import _ from "lodash";

/**
 * Check if the has changed its properties or value types.
 * This is a very basic version of JSON Schema validation.
 * I decided to implement it myself in order to avoid the complexity of adding Json Schema to the project.
 */
export const compareJsonSchema = (
  oldValue: { [key: string]: any },
  newValue: { [key: string]: any }
) => {
  if (!_.isEqual(_.keys(oldValue).sort(), _.keys(newValue).sort())) {
    return false;
  }

  for (const key of _.keys(newValue)) {
    if (typeof oldValue[key] !== typeof newValue[key]) {
      return false;
    }
  }

  return true;
};
