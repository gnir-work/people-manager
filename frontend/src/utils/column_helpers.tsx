import React from "react";
import { sortByField } from "./sorters";
import EditableTag from "../components/tags/EditableTag";
import { arrayToAntdMappings } from "./filters";
import TagList from "../components/tags/TagList";
import EditableText from "../components/fields/text/EditableText";
import { Rule } from "antd/lib/form";
import TableTextFilter from "../components/filters/TableTextFilter";
import BasicData from "../types/data";

export function get_column_fields<K extends BasicData>(
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

export function get_tag_fields<K extends BasicData>(
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

export function get_tag_list_fields<K extends BasicData>(
  possibleValues: string[],
  field: keyof K,
  additionText: string,
  updateData: Function
) {
  return {
    render: (data: string[], record: K) => (
      <TagList
        tags={data}
        additionText={additionText}
        possibleTags={possibleValues}
        onChange={(newTags: string[]) => {
          updateData(record, field, newTags);
        }}
      />
    ),
    filters: arrayToAntdMappings(possibleValues)
  };
}

export function get_text_fields<K extends BasicData>(
  field: keyof K,
  rules: Rule[],
  updateData: Function
) {
  return {
    render: (value: string, record: K) => (
      <EditableText
        onChange={newValue => updateData(record, field, newValue)}
        rules={rules}
        initialValue={value}
      />
    ),
    filterDropdown: TableTextFilter
  };
}
