import React from "react";
import { Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./TableTextFilter.scss";

interface TableTextFilterProps {
  setSelectedKeys: (newFilters: string[]) => void;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
}

const TableTextFilter: React.FC<TableTextFilterProps> = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters
}) => {
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeys = e.target.value ? [e.target.value] : [];
    setSelectedKeys(newKeys);
  };

  return (
    <div className="table-filter">
      <Input
        ref={(instance: Input) => {
          if (instance) {
            instance.focus();
          }
        }}
        placeholder={`הכנס את החיפוש`}
        value={selectedKeys[0]}
        onChange={onSearch}
        className="search-input"
        onPressEnter={confirm}
      />
      <Button
        type="primary"
        onClick={confirm}
        icon={<FontAwesomeIcon className="search-icon" icon={faSearch} />}
        size="small"
        className="search-button"
      >
        חפש
      </Button>
      <Button onClick={clearFilters} size="small" className="clear-button">
        נקה חיפוש
      </Button>
    </div>
  );
};

export default TableTextFilter;
