import React from "react";
import { Tag } from "antd";
import { statusToColor } from "../../consts";

export interface PersonStatusProps {
  status: string;
}

const PersonStatus: React.FC<PersonStatusProps> = ({ status }) => (
  <Tag color={statusToColor[status]}>{status}</Tag>
);

export default PersonStatus;
