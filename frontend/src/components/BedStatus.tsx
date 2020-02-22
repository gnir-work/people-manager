import React from 'react';
import Flag from './Flag';

import { AvailableBedStatuses } from "../api/types";
import { bedStatusToText } from "../consts"


export interface BedStatusProps {
    status: AvailableBedStatuses
}

const statusToColor = {
    [AvailableBedStatuses.NoNeed]: 'green',
    [AvailableBedStatuses.Searching]: 'red',
    [AvailableBedStatuses.Found]: 'green',
}

const BedStatus : React.FC<BedStatusProps> = ({ status }) => (
    <Flag<AvailableBedStatuses> colors={statusToColor} current={status} texts={bedStatusToText} />
)


export default BedStatus;