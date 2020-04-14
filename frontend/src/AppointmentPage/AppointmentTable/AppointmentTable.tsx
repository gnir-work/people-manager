import React, { useContext } from "react";

import { AppointmentColumns } from "./AppointmentColumns";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { PeopleSettingsContext } from "../../contexts/PeopleSettingsContext";
import DataTable from "../../components/DataTable";

interface AppointmentTableProps {
  className?: String;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ className }) => {
  const { data, updateData, deleteData } = useContext(AppointmentContext);
  const peopleSettings = useContext(PeopleSettingsContext);
  return (
    <DataTable
      className={className}
      columns={AppointmentColumns(updateData, deleteData, peopleSettings)}
      data={data}
    />
  );
};

export default AppointmentTable;
