import React, { useContext } from "react";

import { AppointmentColumns } from "./AppointmentColumns";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { PeopleSettingsContext } from "../../contexts/PeopleSettingsContext";
import DataTable from "../../components/DataTable";

interface PeopleTableProps {
  className?: String;
}

const AppointmentTable: React.FC<PeopleTableProps> = ({ className }) => {
  const appointmentContext = useContext(AppointmentContext);
  const peopleSettings = useContext(PeopleSettingsContext);
  return (
    <DataTable
      className={className}
      columns={AppointmentColumns(appointmentContext, peopleSettings)}
      data={appointmentContext.data}
    />
  );
};

export default AppointmentTable;
