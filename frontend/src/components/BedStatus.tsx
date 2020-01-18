import React from 'react';
import { Tag } from 'antd';

import { AvailableBedStatuses } from "../api/types";


export interface BedStatusProps {
    status: AvailableBedStatuses
}

const statusToColor = {
    [AvailableBedStatuses.NoNeed]: 'green',
    [AvailableBedStatuses.Searching]: 'red',
    [AvailableBedStatuses.Found]: 'green',
}

const BedStatus : React.FC<BedStatusProps> = ({ status }) => (
    <Tag color={statusToColor[status]}> { status } </Tag>
)


export default BedStatus;