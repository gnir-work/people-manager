import React from "react";
import moment, { Moment } from "moment";
import { DatePicker } from "antd";

import "./AppointmentDateRange.scss";

interface AppointmentDateRageProps {
  dates: [Moment, Moment];
  onChange: (newDates: [Moment, Moment]) => void;
}

const AppointmentDateRage: React.FC<AppointmentDateRageProps> = ({
  dates,
  onChange
}) => {
  const today = moment().startOf("day");
  const validatedDay = (current: Moment) => current < today;

  const handleChange = (newDates: any) => {
    onChange([newDates[0].startOf("day"), newDates[1].startOf("day")]);
  };
  console.log(dates);

  return (
    <div className="appointment-date-range">
      <DatePicker.RangePicker
        size="small"
        value={dates}
        onChange={handleChange}
        disabledDate={validatedDay}
      />
    </div>
  );
};

export default AppointmentDateRage;
