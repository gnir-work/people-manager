import React from 'react';
import { useCallback } from 'react';
import { Table, Input, Button, Icon } from 'antd';

import "./TableFilter.scss";

interface TableFilterProps {
    setSelectedKeys: Function,
    selectedKeys: string[],
    confirm: () => void,
    clearFilters: () => void
}

const TableFilter: React.FC<TableFilterProps> = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters
}) => {
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newKeys = e.target.value ? [e.target.value] : [];
        setSelectedKeys(newKeys);
    };

    return (<div className="table-filter">
        <Input
            placeholder={`הכנס את החיפוש`}
            value={selectedKeys[0]}
            onChange={onSearch}
            className="search-input"
            onPressEnter={confirm}
        />
        <Button
            type="primary"
            onClick={confirm}
            icon="search"
            size="small"
            className="search-button"
        >
            חפש
        </Button>
        <Button
            onClick={clearFilters}
            size="small"
            className="clear-button"
        >
            נקה חיפוש
        </Button>
    </div>
    );
};

export default TableFilter;