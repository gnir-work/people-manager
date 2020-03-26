import React, { useContext } from "react";
import classNames from "classnames";
import { Table } from "antd";

import { AppointmentColumns } from "./AppointmentColumns";
import { AppointmentContext } from "../../contexts/AppointmentContext";

interface PeopleTableProps {
  className?: String;
}

const AppointmentTable: React.FC<PeopleTableProps> = ({ className }) => {
  const { appointments } = useContext(AppointmentContext);
  const data = appointments.map(appointment => ({
    ...appointment,
    key: appointment.id
  }));
  return (
    <div className={classNames(className, "appointment-table-container")}>
      <Table
        dataSource={data}
        columns={AppointmentColumns}
        size="middle"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default AppointmentTable;
