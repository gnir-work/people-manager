import React from "react";
import { sortByField } from "./sorters";
import EditableTag from "../components/tags/EditableTag";
import { arrayToAntdMappings } from "./filters";

export function get_column_fields<K extends { [key: string]: any }>(
  field: keyof K,
  filterFunction?: Function
) {
  const fields = {
    dataIndex: field,
    key: field,
    sorter: (firstAppointment: K, secondAppointment: K) =>
      sortByField(firstAppointment, secondAppointment, field)
  };

  if (filterFunction) {
    return {
      ...fields,
      onFilter: (value: string, record: K) =>
        filterFunction(record, value, field)
    };
  } else {
    return fields;
  }
}

export function get_tag_fields<K extends { [key: string]: any }>(
  possibleValues: string[],
  field: keyof K,
  updateData: Function
) {
  return {
    filters: arrayToAntdMappings(possibleValues),
    render: (value: string, currentData: K) => (
      <EditableTag
        possibleTags={possibleValues}
        onTagChange={(newValue: string) =>
          updateData(currentData, field, newValue)
        }
      >
        {value}
      </EditableTag>
    )
  };
}
