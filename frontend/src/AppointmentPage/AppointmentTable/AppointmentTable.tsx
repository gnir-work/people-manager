import React from "react";
import classNames from "classnames";
import { Table } from "antd";
import moment from "moment";

import { AppointmentColumns } from "./AppointmentColumns";
import { Appointment } from "../../types/appointment";
import { Person } from "../../types/person";

interface PeopleTableProps {
  className?: String;
}

const AppointmentTable: React.FC<PeopleTableProps> = ({ className }) => {
  const person = new Person({
    fullName: "Nir",
    personalId: "123213123",
    status: "חייל",
    phone: "0547404737",
    team: "team",
    tracks: [],
    subjects: [],
    availability: "לא זמין"
  });
  const appointment = new Appointment({
    person: person,
    phase: "אחוד",
    week: 1,
    from: moment(),
    to: moment(),
    bedStatus: "לא צריך",
    entryStatus: "יש",
    invitor: "gnir",
    makishur: false,
    makishurInvitor: "gnir",
    track: "pasten",
    reason: "",
    remarks: ""
  });
  return (
    <div className={classNames(className, "appointment-table-container")}>
      <Table
        dataSource={[appointment]}
        columns={AppointmentColumns}
        size="middle"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default AppointmentTable;
