import React, { useContext } from "react";
import classNames from "classnames";
import { Table } from "antd";

import { AppointmentColumns } from "./AppointmentColumns";
import { AppointmentContext } from "../../contexts/AppointmentContext";

interface PeopleTableProps {
  className?: String;
}

const AppointmentTable: React.FC<PeopleTableProps> = ({ className }) => {
  const appointmentContext = useContext(AppointmentContext);
  const data = appointmentContext.appointments.map(appointment => ({
    ...appointment,
    key: appointment.id
  }));
  return (
    <div className={classNames(className, "appointment-table-container")}>
      <Table
        dataSource={data}
        columns={AppointmentColumns(appointmentContext)}
        size="middle"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default AppointmentTable;
