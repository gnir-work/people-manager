import React from "react";
import classNames from "classnames";
import { Table, DatePicker } from "antd";
import { PersonInterface } from "../api/people";
import Flag from "./Flag";
import TableFilter from './TableFilter';
import { sortById, sortByName } from "../utils/sorters";

import "./PeopleTable.scss";
import BedStatus from "./BedStatus";

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
        onFilter: (value: string, record:PersonInterface) => record['fullName'].toLowerCase().includes(value.toLowerCase()),
        filterDropdown: TableFilter,
    },
    {
        title: "מ.א",
        dataIndex: "personId",
        key: "personId",
        sorter: sortById
    },
    {
        title: "גיל",
        dataIndex: "age",
        key: "age"
    },
    {
        title: "תקופה",
        dataIndex: "period",
        key: "period"
    },
    {
        title: "שבוע",
        dataIndex: "week",
        key: "week"
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
        key: "invitor"
    },
    {
        title: "מיטה",
        key: "bed",
        dataIndex: "bed",
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
