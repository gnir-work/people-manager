import React from 'react';
import { Tag } from 'antd';


export interface FlagProps {
    checked: boolean
}

const Flag : React.FC<FlagProps> = ({ checked }) => (
    <Tag color={checked ? 'green' : 'red'}> { checked ? 'יש' : 'אין'} </Tag>
)


export default Flag;