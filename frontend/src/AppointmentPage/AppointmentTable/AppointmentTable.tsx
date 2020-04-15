import React, { useContext } from "react";

import { AppointmentColumns } from "./AppointmentColumns";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import { SiteSettingsContext } from "../../contexts/SiteSettingsContext";
import DataTable from "../../components/DataTable";

interface AppointmentTableProps {
  className?: string;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ className }) => {
  const { data, updateData, deleteData, loading } = useContext(
    AppointmentContext
  );
  const peopleSettings = useContext(SiteSettingsContext);
  return (
    <DataTable
      className={className}
      columns={AppointmentColumns(updateData, deleteData, peopleSettings)}
      data={data}
      loading={loading}
    />
  );
};

export default AppointmentTable;
