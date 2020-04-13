import React from "react";
import { Moment } from "moment";
import { DatePicker } from "antd";

import "./DateRangeField.scss";
import { beforeToday, getStartOfDay } from "../../utils/time";

interface AppointmentDateRageProps {
  dates?: [Moment, Moment];
  onChange?: (newDates: [Moment, Moment]) => void;
}

const DateRangeField: React.FC<AppointmentDateRageProps> = ({
  dates,
  onChange = () => {}
}) => {
  const handleChange = (newDates: any) => {
    onChange(newDates.map(getStartOfDay));
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
