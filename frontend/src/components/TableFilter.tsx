import React from 'react';
import { Table, Input, Button, Icon } from 'antd';

interface TableFilterProps {
    setSelectedKeys: Function,
    selectedKeys: string[],
    confirm: Function,
    clearFilters: Function
}

const TableFilter: React.FC<TableFilterProps> = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters
}) => (
    <div style={{ padding: 8 }}>
        <Input
            placeholder={`Search me`}
            value={selectedKeys[0]}
            onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
            type="primary"
            onClick={() => confirm()}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
        >
            Search
        </Button>
        <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
        >
            Reset
        </Button>
    </div>
);

export default TableFilter;