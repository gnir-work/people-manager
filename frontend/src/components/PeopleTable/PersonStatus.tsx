import React from "react";
import Flag from "../Flag";

import { PersonStatuses } from "../../types/person";
import { personStatusToText } from "../../consts";

export interface BedStatusProps {
  status: PersonStatuses;
}

const statusToColor = {
  [PersonStatuses.Citizen]: "blue",
  [PersonStatuses.Soldier]: "green"
};

const BasicStatus: React.FC<BedStatusProps> = ({ status }) => (
  <Flag colors={statusToColor} current={status} texts={personStatusToText} />
);

export default BasicStatus;
