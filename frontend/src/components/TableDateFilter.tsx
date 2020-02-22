import React from "react";
import { DatePicker, Button } from "antd";

import "./TableFilter.scss";
import "./TableDateFilter.scss";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import { Moment } from "moment";

interface TableDateFilterProps {
  setSelectedKeys: Function;
  selectedKeys: Array<{
    since: Moment;
    until: Moment;
  }>;
  confirm: () => void;
  clearFilters: () => void;
}

const TableDateFilter: React.FC<TableDateFilterProps> = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters
}) => {
  const onSearch = (dates: RangePickerValue) => {
    setSelectedKeys([
      {
        since: dates[0],
        until: dates[1]
      }
    ]);
  };

  return (
    <div className="table-filter table-date-filter">
      <DatePicker.RangePicker onChange={onSearch} size="small" />
      <Button
        type="primary"
        onClick={confirm}
        icon="search"
        size="small"
        className="search-button"
      >
        חפש
      </Button>
      <Button onClick={clearFilters} size="small" className="clear-button">
        נקה חיפוש
      </Button>
    </div>
  );
};

export default TableDateFilter;
