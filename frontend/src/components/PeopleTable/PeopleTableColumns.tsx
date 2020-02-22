import React from "react";
import { SortOrder } from "antd/lib/table/interface";
import { DatePicker } from "antd";

import TableTextFilter from "../TableTextFilter";
import TableDateFilter from "../TableDateFilter";
import {
  sortById,
  sortByName,
  sortByWeek,
  sortByArrivalTime
} from "../../utils/sorters";
import {
  stringsFilterByField,
  numbersFilterByField,
  datesFilterByField,
  enumMappingToAntdFilters
} from "../../utils/filters";
import {
  AvailableBedStatuses,
  AvailableBasicStatuses,
  PersonInterface
} from "../../api/types";
import BedStatus from "../BedStatus";
import BasicStatus from "../BasicStatus";
import { basicStatusToText, bedStatusToText } from "../../consts";
import moment, { Moment } from "moment";

const defaultSortOrder: SortOrder = "ascend";

const availableBasicStatusesFilters = enumMappingToAntdFilters(
  basicStatusToText
);

const availableBedStatusesFilters = enumMappingToAntdFilters(bedStatusToText);

export const PeopleTableColumns = [
  {
    title: "שם מלא",
    dataIndex: "fullName",
    key: "fullName",
    sorter: sortByName,
    onFilter: (value: string, record: PersonInterface) =>
      stringsFilterByField(record, value, "fullName"),
    filterDropdown: TableTextFilter
  },
  {
    title: "מ.א",
    dataIndex: "personId",
    key: "personId",
    sorter: sortById,
    onFilter: (value: string, record: PersonInterface) =>
      stringsFilterByField(record, value, "personId"),
    filterDropdown: TableTextFilter
  },
  {
    title: "גיל",
    dataIndex: "age",
    key: "age",
    onFilter: (value: string, record: PersonInterface) =>
      numbersFilterByField(record, value, "age"),
    filterDropdown: TableTextFilter
  },
  {
    title: "תקופה",
    dataIndex: "period",
    key: "period",
    onFilter: (value: string, record: PersonInterface) =>
      stringsFilterByField(record, value, "period"),
    filterDropdown: TableTextFilter
  },
  {
    title: "שבוע",
    dataIndex: "week",
    key: "week",
    sorter: sortByWeek,
    defaultSortOrder,
    onFilter: (value: string, record: PersonInterface) =>
      numbersFilterByField(record, value, "week"),
    filterDropdown: TableTextFilter
  },
  {
    title: "תאריכים (לפי זמן הגעה)",
    key: "time",
    render: (text: string, record: PersonInterface) => (
      <DatePicker.RangePicker
        defaultValue={[record.arrivalTime, record.departureTime]}
        size="small"
      />
    ),
    filterDropdown: TableDateFilter,
    onFilter: (datesRange: {since: Moment, until: Moment}, record: PersonInterface) => {
        debugger;
        return datesFilterByField(record, datesRange, "arrivalTime");
    },
    sorter: sortByArrivalTime,
    width: "20em"
  },
  {
    title: "מזמין",
    dataIndex: "invitor",
    key: "invitor",
    onFilter: (value: string, record: PersonInterface) =>
      stringsFilterByField(record, value, "invitor"),
    filterDropdown: TableTextFilter
  },
  {
    title: "מיטה",
    key: "bed",
    dataIndex: "bed",
    filters: availableBedStatusesFilters,
    onFilter: (status: string, record: PersonInterface) =>
      numbersFilterByField(record, status, "bed"),
    render: (status: AvailableBedStatuses) => <BedStatus status={status} />,
    width: "4em"
  },
  {
    title: "אישור כניסה",
    dataIndex: "entryPass",
    key: "entryPass",
    filters: availableBasicStatusesFilters,
    onFilter: (status: string, record: PersonInterface) =>
      numbersFilterByField(record, status, "entryPass"),
    render: (checked: AvailableBasicStatuses) => (
      <BasicStatus status={checked} />
    )
  },
  {
    title: "ווידאו הגעה",
    dataIndex: "verifiedArrival",
    key: "verifiedArrival",
    render: (checked: AvailableBasicStatuses) => (
      <BasicStatus status={checked} />
    ),
    filters: availableBasicStatusesFilters,
    onFilter: (status: string, record: PersonInterface) =>
      numbersFilterByField(record, status, "verifiedArrival")
  },
  {
    title: "בקשת מילואים",
    dataIndex: "miluim",
    key: "miluim",
    render: (checked: AvailableBasicStatuses) => (
      <BasicStatus status={checked} />
    ),
    filters: availableBasicStatusesFilters,
    onFilter: (status: string, record: PersonInterface) =>
      numbersFilterByField(record, status, "miluim")
  },
  {
    title: "בקשת מהקישור",
    dataIndex: "makishur",
    key: "makishur",
    render: (checked: AvailableBasicStatuses) => (
      <BasicStatus status={checked} />
    ),
    filters: availableBasicStatusesFilters,
    onFilter: (status: string, record: PersonInterface) =>
      numbersFilterByField(record, status, "makishur")
  },
  {
    title: "הגיעה",
    dataIndex: "arrived",
    key: "arrived",
    render: (checked: AvailableBasicStatuses) => (
      <BasicStatus status={checked} />
    ),
    filters: availableBasicStatusesFilters,
    onFilter: (status: string, record: PersonInterface) =>
      numbersFilterByField(record, status, "arrived")
  },
  {
    title: "מגמה \\ מסלול",
    dataIndex: "megama",
    key: "megama",
    onFilter: (value: string, record: PersonInterface) =>
      stringsFilterByField(record, value, "megama"),
    filterDropdown: TableTextFilter
  },
  {
    title: "סיבה",
    dataIndex: "reason",
    key: "reason",
    onFilter: (value: string, record: PersonInterface) =>
      stringsFilterByField(record, value, "reason"),
    filterDropdown: TableTextFilter
  },
  {
    title: "הערות נוספות",
    dataIndex: "remarks",
    key: "remarks",
    width: "30em",
    onFilter: (value: string, record: PersonInterface) =>
      stringsFilterByField(record, value, "remarks"),
    filterDropdown: TableTextFilter
  }
];
