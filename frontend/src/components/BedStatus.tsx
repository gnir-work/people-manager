import React from 'react';
import Flag from './Flag';

import { AvailableBedStatuses } from "../api/types";


export interface BedStatusProps {
    status: AvailableBedStatuses
}

const statusToColor = {
    [AvailableBedStatuses.NoNeed]: 'green',
    [AvailableBedStatuses.Searching]: 'red',
    [AvailableBedStatuses.Found]: 'green',
}

export const statusToText = {
    [AvailableBedStatuses.NoNeed]: 'אין צורך',
    [AvailableBedStatuses.Searching]: 'מחפשים',
    [AvailableBedStatuses.Found]: 'יש מיטה',
}

const BedStatus : React.FC<BedStatusProps> = ({ status }) => (
    <Flag<AvailableBedStatuses> colors={statusToColor} current={status} texts={statusToText} />
)


export default BedStatus;