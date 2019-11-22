import React from "react";
import { Table } from "antd";
import { PersonInterface } from "../api/people";

interface PeopleTableProps {
    people: Array<PersonInterface>;
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

const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
    const data = people.map(person => ({ ...person, key: person.id }));
    return <Table dataSource={people} columns={PeopleTableColumns} />;
};

export default PeopleTable;
