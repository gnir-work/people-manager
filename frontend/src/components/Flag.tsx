import React from "react";
import { Tag } from "antd";

import { BasicStatus } from "../api/types";

export interface FlagProps {
    checked: BasicStatus;
}

const Flag: React.FC<FlagProps> = ({ checked }) => (
    <Tag color={checked === BasicStatus.Done ? "green" : "red"}>
        {checked === BasicStatus.Done ? "יש" : "אין"}{" "}
    </Tag>
);

export default Flag;
