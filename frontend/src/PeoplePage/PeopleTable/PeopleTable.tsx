import React, { useContext } from "react";

import { PeopleTableColumns } from "./PeopleTableColumns";
import { PeopleContext } from "../../contexts/PeopleContext";
import { SiteSettingsContext } from "../../contexts/SiteSettingsContext";
import DataTable from "../../components/DataTable";

interface PeopleTableProps {
  className?: string;
}

const PeopleTable: React.FC<PeopleTableProps> = ({ className }) => {
  const peopleContext = useContext(PeopleContext);
  const peopleSettingsContext = useContext(SiteSettingsContext);
  return (
    <DataTable
      className={className}
      data={peopleContext.data}
      columns={PeopleTableColumns(peopleContext, peopleSettingsContext)}
      loading={peopleContext.loading}
    />
  );
};

export default PeopleTable;
