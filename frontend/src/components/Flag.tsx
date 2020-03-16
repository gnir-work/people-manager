import React from "react";
import { Tag } from "antd";

export interface FlagProps<T extends string | number> {
  current: T;
  colors: {
    [key in T]: string;
  };
  texts: {
    [key in T]: string;
  };
  className?: string;
}

const Flag: <T extends string | number>(
  p: FlagProps<T>
) => React.ReactElement<FlagProps<T>> = ({
  current,
  colors,
  texts,
  className
}) => (
  <Tag className={className} color={colors[current]}>
    {texts[current]}
  </Tag>
);

export default Flag;
