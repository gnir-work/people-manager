import React from "react";
import AddFlag from "./AddFlag";

import "./FlagList.scss";
import { Tag } from "antd";
import _ from "lodash";

interface FlagListProps {
  flags: string[];
  dataSet: string[];
  colors?: {
    [color: string]: string;
  };
  additionText: string;
  onFlagDelete: Function;
  onFlagCreation: Function;
}

const FlagList: React.FC<FlagListProps> = ({
  flags,
  dataSet,
  colors = {},
  onFlagCreation,
  onFlagDelete,
  additionText
}) => {
  return (
    <div className="flag-list">
      {flags.map(data => (
        <Tag
          color={_.isEmpty(colors) ? "" : colors[data]}
          key={data}
          className="flag"
          closable
          onClose={() => onFlagDelete(data)}
        >
          {data}
        </Tag>
      ))}
      {dataSet.length > 0 && (
        <AddFlag
          text={additionText}
          dataSet={dataSet}
          onSubmit={onFlagCreation}
        />
      )}
    </div>
  );
};

export default FlagList;
