import React from "react";
import classNames from "classnames";
import { Table, DatePicker } from "antd";
import { PersonInterface, BasicStatus } from "../api/types";
import Flag from "./Flag";
import TableFilter from "./TableFilter";
import { sortById, sortByName } from "../utils/sorters";
import { stringsFilterByField, numbersFilterByField } from "../utils/filters";
import { enumToFilterValues } from "../utils/types";

import "./PeopleTable.scss";
import { AvailableBedStatuses } from "../api/types";
import BedStatus from './BedStatus';

interface PeopleTableProps {
    people: Array<PersonInterface>;
    className?: String;
}

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
            numbersFilterByField(record, parseInt(value), "age"),
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
            numbersFilterByField(record, parseInt(value), "week"),
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
        filters: enumToFilterValues(AvailableBedStatuses),
        onFilter: (value: string, record: PersonInterface) => record.bed === value,
        render: (status: AvailableBedStatuses) => <BedStatus status={status} />,
        width: "4em"
    },
    {
        title: "אישור כניסה",
        dataIndex: "entryPass",
        key: "entryPass",
        filters: enumToFilterValues(BasicStatus),
        onFilter: (status: string, record: PersonInterface) => record.entryPass === status,
        render: (checked: BasicStatus) => <Flag checked={checked} />,
    },
    {
        title: "ווידאו הגעה",
        dataIndex: "verifiedArrival",
        key: "verifiedArrival",
        render: (checked: BasicStatus) => <Flag checked={checked} />,
        filters: enumToFilterValues(BasicStatus),
        onFilter: (status: string, record: PersonInterface) => record.verifiedArrival === status,
    },
    {
        title: "בקשת מילואים",
        dataIndex: "miluim",
        key: "miluim",
        render: (checked: BasicStatus) => <Flag checked={checked} />,
        filters: enumToFilterValues(BasicStatus),
        onFilter: (status: string, record: PersonInterface) => record.miluim === status,
    },
    {
        title: "בקשת מהקישור",
        dataIndex: "makishur",
        key: "makishur",
        render: (checked: BasicStatus) => <Flag checked={checked} />,
        filters: enumToFilterValues(BasicStatus),
        onFilter: (status: string, record: PersonInterface) => record.makishur === status,
    },
    {
        title: "הגיעה",
        dataIndex: "arrived",
        key: "arrived",
        render: (checked: BasicStatus) => <Flag checked={checked} />,
        filters: enumToFilterValues(BasicStatus),
        onFilter: (status: string, record: PersonInterface) => record.arrived === status,
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
