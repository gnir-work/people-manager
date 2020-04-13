import React, { useContext } from "react";
import classNames from "classnames";
import { Table } from "antd";

import { AppointmentColumns } from "./AppointmentColumns";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { PeopleSettingsContext } from "../../contexts/PeopleSettingsContext";

interface PeopleTableProps {
  className?: String;
}

const AppointmentTable: React.FC<PeopleTableProps> = ({ className }) => {
  const appointmentContext = useContext(AppointmentContext);
  const peopleSettings = useContext(PeopleSettingsContext);
  const data = appointmentContext.data.map(appointment => ({
    ...appointment,
    key: appointment.id
  }));

  return (
    <div
      className={classNames(
        className,
        "appointment-table-container",
        "data-table"
      )}
    >
      <Table
        dataSource={data}
        columns={AppointmentColumns(appointmentContext, peopleSettings)}
        size="middle"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default AppointmentTable;
