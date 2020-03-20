import React, { useContext } from "react";
import classNames from "classnames";
import { Table } from "antd";

import { PeopleTableColumns } from "./PeopleTableColumns";
import { PeopleContext } from "../../contexts/PeopleContext";
import "./PeopleTable.scss";

interface PeopleTableProps {
  className?: String;
}

const PeopleTable: React.FC<PeopleTableProps> = ({ className }) => {
  const peopleContext = useContext(PeopleContext);
  const data = peopleContext.people.map(person => ({
    ...person,
    key: person.id
  }));
  return (
    <div className={classNames(className, "people-table-container")}>
      <Table
        dataSource={data}
        columns={PeopleTableColumns(peopleContext)}
        size="middle"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
};

export default PeopleTable;