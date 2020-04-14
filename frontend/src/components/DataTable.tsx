import React from "react";
import classNames from "classnames";
import { Table } from "antd";

import "./DataTable.scss";
import BasicData from "../types/data";
import { TableProps } from "antd/lib/table";

interface DataTableProps<K extends BasicData> extends TableProps<K> {
  className?: string;
  data: K[];
}

export default function DataTable<K extends BasicData>({
  data,
  className,
  ...tableProps
}: DataTableProps<K>) {
  return (
    <div className={classNames(className, "data-table-container")}>
      <Table
        dataSource={data.map((item: K) => ({ ...item, key: item.id }))}
        size="middle"
        pagination={{ pageSize: 15 }}
        {...tableProps}
      />
    </div>
  );
}
