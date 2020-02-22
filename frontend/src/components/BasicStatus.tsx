import React from 'react';
import Flag from './Flag';

import { AvailableBasicStatuses } from "../api/types";
import { basicStatusToText} from "../consts";


export interface BedStatusProps {
    status: AvailableBasicStatuses
}

const statusToColor = {
    [AvailableBasicStatuses.Done]: 'green',
    [AvailableBasicStatuses.Pending]: 'red',
}

const BasicStatus : React.FC<BedStatusProps> = ({ status }) => (
    <Flag<AvailableBasicStatuses> colors={statusToColor} current={status} texts={basicStatusToText} />
)


export default BasicStatus;