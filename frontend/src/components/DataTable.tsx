import React from "react";
import classNames from "classnames";
import { Table } from "antd";

import "./DataTable.scss";
import BasicData from "../types/data";
import { ColumnsType } from "antd/lib/table";

interface DataTableProps<K extends BasicData> {
  className?: String;
  data: K[];
  columns: ColumnsType<K>;
}

export default function DataTable<K extends BasicData>({
  className,
  data,
  columns
}: DataTableProps<K>) {
  return (
    <div className={classNames(className, "data-table-container")}>
      <Table
        dataSource={data.map((item: K) => ({ ...item, key: item.id }))}
        columns={columns}
        size="middle"
        pagination={{ pageSize: 30 }}
      />
    </div>
  );
}
