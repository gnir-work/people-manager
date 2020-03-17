import React from "react";
import Flag from "./Flag";
import AddFlag from "./AddFlag";

import "./FlagList.scss";

interface FlagListProps {
  flags: string[];
  dataSet: string[];
  additionText: string;
  colorMapping: {
    [key: string]: string;
  };
  textMapping: {
    [key: string]: string;
  };
  onFlagDelete: Function;
  onFlagCreation: Function;
}

const FlagList: React.FC<FlagListProps> = ({
  flags,
  dataSet,
  colorMapping,
  onFlagCreation,
  onFlagDelete,
  textMapping,
  additionText
}) => {
  return (
    <div className="flag-list">
      {flags.map(data => (
        <Flag
          key={data}
          className="flag"
          current={data}
          colors={colorMapping}
          texts={textMapping}
          closable
          onClose={() => onFlagDelete(data)}
        />
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
