import React from "react";
import classNames from "classnames";
import { Table, Tag, Switch } from "antd";
import { PersonInterface } from "../api/people";
import Flag from "./Flag";

import "./PeopleTable.scss";

interface PeopleTableProps {
    people: Array<PersonInterface>;
    className?: String;
}

const PeopleTableColumns = [
    {
        title: "שם מלא",
        dataIndex: "fullName",
        key: "fullName"
    },
    {
        title: "מ.א",
        dataIndex: "personId",
        key: "personId"
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
        title: "ממתי",
        dataIndex: "arrivalTime",
        key: "arrivalTime"
    },
    {
        title: "עד מתי",
        dataIndex: "departureTime",
        key: "departureTime"
    },
    {
        title: "מזמין",
        dataIndex: "invitor",
        key: "invitor"
    },
    {
        title: "מיטה",
        dataIndex: "bed",
        key: "beb"
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
        render: (checked: boolean) => <Flag checked={checked} />
    },
    {
        title: "בקשת מהקישור",
        dataIndex: "makishur",
        key: "makishur",
        render: (checked: boolean) => <Flag checked={checked} />
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
        key: "remarks"
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
