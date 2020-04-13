import React from "react";
import moment, { Moment } from "moment";
import { DatePicker } from "antd";

import "./DateRangeField.scss";
import { beforeToday } from "../../utils/time";

interface AppointmentDateRageProps {
  dates?: [Moment, Moment];
  onChange?: (newDates: [Moment, Moment]) => void;
}

const DateRangeField: React.FC<AppointmentDateRageProps> = ({
  dates,
  onChange = () => {}
}) => {
  const handleChange = ([from, to]: any) => {
    onChange([from.startOf("day"), to.startOf("day")]);
  };

  return (
    <div className="date-range-field">
      <DatePicker.RangePicker
        size="small"
        value={dates}
        onChange={handleChange}
        disabledDate={beforeToday}
      />
    </div>
  );
};

export default DateRangeField;
