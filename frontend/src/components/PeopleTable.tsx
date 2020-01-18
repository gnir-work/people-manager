import React from "react";
import classNames from "classnames";
import { Table, DatePicker } from "antd";
import { PersonInterface } from "../api/people";
import Flag from "./Flag";
import TableFilter from "./TableFilter";
import { sortById, sortByName } from "../utils/sorters";
import { stringsFilterByField, numbersFilterByField } from "../utils/filters";
import { enumToFilterValues } from "../utils/types";

import "./PeopleTable.scss";
import BedStatus, { AvailableBedStatuses } from "./BedStatus";

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
        onFilter: (value: string, record: PersonInterface) => record.bed === parseInt(value),
        render: (status: number) => <BedStatus status={status} />,
        width: "4em"
    },
    {
        title: "אישור כניסה",
        dataIndex: "entryPass",
        key: "entryPass",
        render: (checked: boolean) => <Flag checked={checked} />,
        width: "4em"
    },
    {
        title: "ווידאו הגעה",
        dataIndex: "verifiedArrival",
        key: "verifiedArrival",
        render: (checked: boolean) => <Flag checked={checked} />,
        width: "4em"
    },
    {
        title: "בקשת מילואים",
        dataIndex: "miluim",
        key: "miluim",
        render: (checked: boolean) => <Flag checked={checked} />,
        width: "5em"
    },
    {
        title: "בקשת מהקישור",
        dataIndex: "makishur",
        key: "makishur",
        render: (checked: boolean) => <Flag checked={checked} />,
        width: "5em"
    },
    {
        title: "הגיעה",
        dataIndex: "arrived",
        key: "arrived",
        render: (checked: boolean) => <Flag checked={checked} />,
        width: "4em"
    },
    {
        title: "מגמה \\ מסלול",
        dataIndex: "megama",
        key: "megama"
    },
    {
        title: "סיבה",
        dataIndex: "reason",
        key: "reason"
    },
    {
        title: "הערות נוספות",
        dataIndex: "remarks",
        key: "remarks",
        width: "30em"
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
