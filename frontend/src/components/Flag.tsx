import React from "react";
import { Tag } from "antd";
import { TagProps } from "antd/lib/tag";

export interface FlagProps<T extends string | number> extends TagProps {
  current: T;
  colors: {
    [key in T]: string;
  };
  texts: {
    [key in T]: string;
  };
}

const Flag: <T extends string | number>(
  p: FlagProps<T>
) => React.ReactElement<FlagProps<T>> = ({
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
