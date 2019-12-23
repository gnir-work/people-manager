import React from 'react';
import { Tag } from 'antd';

export enum AvailableBedStatuses {
    NoNeed,
    Searching,
    Found
}

export interface BedStatusProps {
    status: AvailableBedStatuses
}

const statusToColor = {
    [AvailableBedStatuses.NoNeed]: 'green',
    [AvailableBedStatuses.Searching]: 'red',
    [AvailableBedStatuses.Found]: 'green',
}

const statusToText = {
    [AvailableBedStatuses.NoNeed]: 'אין צורך',
    [AvailableBedStatuses.Searching]: 'מחפשים',
    [AvailableBedStatuses.Found]: 'יש מיטה',
}

const BedStatus : React.FC<BedStatusProps> = ({ status }) => (
    <Tag color={statusToColor[status]}> { statusToText[status]} </Tag>
)


export default BedStatus;