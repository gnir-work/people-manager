import React from "react";
import classNames from "classnames";
import { Table } from "antd";
import { PersonInterface } from "../api/people";

import './PeopleTable.scss'

interface PeopleTableProps {
    people: Array<PersonInterface>;
    className?: String;
}

const PeopleTableColumns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName"
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age"
    }
];

const PeopleTable: React.FC<PeopleTableProps> = ({ people, className }) => {
    const data = people.map(person => ({ ...person, key: person.id }));
    return (
        <div className={classNames(className, "people-table-container")}>
            <Table
                dataSource={data}
                columns={PeopleTableColumns}
                pagination={false}
            />
        </div>
    );
};

export default PeopleTable;
