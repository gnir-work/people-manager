import React from 'react';
import Flag from './Flag';

import { AvailableBasicStatuses } from "../api/types";



export interface BedStatusProps {
    status: AvailableBasicStatuses
}

const statusToColor = {
    [AvailableBasicStatuses.Done]: 'green',
    [AvailableBasicStatuses.Pending]: 'red',
}

export const statusToText = {
    [AvailableBasicStatuses.Done]: 'יש',
    [AvailableBasicStatuses.Pending]: 'טרם',
}

const BasicStatus : React.FC<BedStatusProps> = ({ status }) => (
    <Flag<AvailableBasicStatuses> colors={statusToColor} current={status} texts={statusToText} />
)


export default BasicStatus;