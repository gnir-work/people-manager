import React from "react";
import classNames from "classnames";
import { Table, DatePicker } from "antd";
import { PersonInterface, AvailableBasicStatuses } from "../api/types";
import TableFilter from "./TableFilter";
import { sortById, sortByName } from "../utils/sorters";
import { stringsFilterByField, numbersFilterByField, enumMappingToAntdFilters} from "../utils/filters";

import "./PeopleTable.scss";
import { AvailableBedStatuses } from "../api/types";
import BedStatus from "./BedStatus";
import { statusToText as bedStatusToText } from "./BedStatus";
import BasicStatus from "./BasicStatus";
import { statusToText as basicStatusToText } from "./BasicStatus";

interface PeopleTableProps {
    people: Array<PersonInterface>;
    className?: String;
}

const availableBasicStatusesFilters = enumMappingToAntdFilters(basicStatusToText);

const availableBedStatusesFilters = enumMappingToAntdFilters(bedStatusToText);

const PeopleTableColumns = [
    {
        title: "שם מלא",
        dataIndex: "fullName",
        key: "fullName",
        sorter: sortByName,
        onFilter: (value: string, record: PersonInterface) =>
            stringsFilterByField(record, value, "fullName"),
        filterDropdown: TableFilter
    },
    {
        title: "מ.א",
        dataIndex: "personId",
        key: "personId",
        sorter: sortById,
        onFilter: (value: string, record: PersonInterface) =>
            stringsFilterByField(record, value, "personId"),
        filterDropdown: TableFilter
    },
    {
        title: "גיל",
        dataIndex: "age",
        key: "age",
        onFilter: (value: string, record: PersonInterface) =>
            numbersFilterByField(record, value, "age"),
        filterDropdown: TableFilter
    },
    {
        title: "תקופה",
        dataIndex: "period",
        key: "period",
        onFilter: (value: string, record: PersonInterface) =>
            stringsFilterByField(record, value, "period"),
        filterDropdown: TableFilter
    },
    {
        title: "שבוע",
        dataIndex: "week",
        key: "week",
        onFilter: (value: string, record: PersonInterface) =>
            numbersFilterByField(record, value, "week"),
        filterDropdown: TableFilter
    },
    {
        title: "תאריכים",
        key: "time",
        render: (text: string, record: PersonInterface) => (
            <DatePicker.RangePicker
                defaultValue={[record.arrivalTime, record.departureTime]}
                size="small"
            />
        ),
        width: "20em"
    },
    {
        title: "מזמין",
        dataIndex: "invitor",
        key: "invitor",
        onFilter: (value: string, record: PersonInterface) =>
            stringsFilterByField(record, value, "invitor"),
        filterDropdown: TableFilter
    },
    {
        title: "מיטה",
        key: "bed",
        dataIndex: "bed",
        filters: availableBedStatusesFilters,
        onFilter: (status: string, record: PersonInterface) => numbersFilterByField(record, status, "bed"),
        render: (status: AvailableBedStatuses) => <BedStatus status={status} />,
        width: "4em"
    },
    {
        title: "אישור כניסה",
        dataIndex: "entryPass",
        key: "entryPass",
        filters: availableBasicStatusesFilters,
        onFilter: (status: string, record: PersonInterface) => numbersFilterByField(record, status, "entryPass"),
        render: (checked: AvailableBasicStatuses) => (
            <BasicStatus status={checked} />
        )
    },
    {
        title: "ווידאו הגעה",
        dataIndex: "verifiedArrival",
        key: "verifiedArrival",
        render: (checked: AvailableBasicStatuses) => (
            <BasicStatus status={checked} />
        ),
        filters: availableBasicStatusesFilters,
        onFilter: (status: string, record: PersonInterface) => numbersFilterByField(record, status, "verifiedArrival"),
    },
    {
        title: "בקשת מילואים",
        dataIndex: "miluim",
        key: "miluim",
        render: (checked: AvailableBasicStatuses) => (
            <BasicStatus status={checked} />
        ),
        filters: availableBasicStatusesFilters,
        onFilter: (status: string, record: PersonInterface) => numbersFilterByField(record, status, "miluim"),
    },
    {
        title: "בקשת מהקישור",
        dataIndex: "makishur",
        key: "makishur",
        render: (checked: AvailableBasicStatuses) => (
            <BasicStatus status={checked} />
        ),
        filters: availableBasicStatusesFilters,
        onFilter: (status: string, record: PersonInterface) => numbersFilterByField(record, status, "makishur"),

    },
    {
        title: "הגיעה",
        dataIndex: "arrived",
        key: "arrived",
        render: (checked: AvailableBasicStatuses) => (
            <BasicStatus status={checked} />
        ),
        filters: availableBasicStatusesFilters,
        onFilter: (status: string, record: PersonInterface) => numbersFilterByField(record, status, "arrived"),
    },
    {
        title: "מגמה \\ מסלול",
        dataIndex: "megama",
        key: "megama",
        onFilter: (value: string, record: PersonInterface) =>
            stringsFilterByField(record, value, "megama"),
        filterDropdown: TableFilter
    },
    {
        title: "סיבה",
        dataIndex: "reason",
        key: "reason",
        onFilter: (value: string, record: PersonInterface) =>
            stringsFilterByField(record, value, "reason"),
        filterDropdown: TableFilter
    },
    {
        title: "הערות נוספות",
        dataIndex: "remarks",
        key: "remarks",
        width: "30em",
        onFilter: (value: string, record: PersonInterface) =>
            stringsFilterByField(record, value, "remarks"),
        filterDropdown: TableFilter
    }
];

const PeopleTable: React.FC<PeopleTableProps> = ({ people, className }) => {
    const data = people.map(person => ({ ...person, key: person.personId }));
    return (
        <div className={classNames(className, "people-table-container")}>
            <Table
                dataSource={data}
                columns={PeopleTableColumns}
                size="middle"
                pagination={{ pageSize: 30 }}
            />
        </div>
    );
};

export default PeopleTable;
