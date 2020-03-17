import React from "react";
import { Tag } from "antd";
import { TagProps } from "antd/lib/tag";

export interface FlagProps extends TagProps {
  current: string;
  colors: {
    [key: string]: string;
  };
  texts: {
    [key: string]: string;
  };
}

const Flag: React.FC<FlagProps> = ({
  current,
  colors,
  texts,
  ...otherProps
}) => (
  <Tag {...otherProps} color={colors[current]}>
    {texts[current]}
  </Tag>
);

export default Flag;
