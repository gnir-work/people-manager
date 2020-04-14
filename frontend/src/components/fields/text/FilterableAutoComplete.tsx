import React, { useState } from "react";
import { AutoCompleteProps } from "antd/lib/auto-complete";
import { AutoComplete } from "antd";
import { filterStringIgnoringCasing } from "../../../utils/filters";

interface FilterableAutoCompleteProps
  extends Omit<AutoCompleteProps, "options" | "onChange"> {
  data: string[];
}

/**
 * A small wrap over the default auto complete giving it text filter functionality.
 * This components supports both control and uncontrolled states, just pass onChange and value props if you want
 * to handle the current value in the parent.
 */
export const FilterableAutoComplete: React.FC<FilterableAutoCompleteProps> = ({
  data,
  value,
  ...autoSelectProps
}) => {
  const [filter, setFilter] = useState("");

  const currentFilter = value || filter;

  const dataSet = data
    .filter(item => filterStringIgnoringCasing(item, currentFilter))
    .map(item => ({ value: item }));

  return (
    <AutoComplete
      value={currentFilter}
      onChange={setFilter}
      options={dataSet}
      {...autoSelectProps}
    />
  );
};
