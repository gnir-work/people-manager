import React from "react";
import AddTag from "./AddTag";

import "./TagList.scss";
import { Tag } from "antd";
import _ from "lodash";

interface TagListProps {
  tags: string[];
  dataSet: string[];
  colors?: {
    [color: string]: string;
  };
  additionText: string;
  onTagDelete: Function;
  onTagCreation: Function;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  dataSet,
  colors = {},
  onTagCreation,
  onTagDelete,
  additionText
}) => {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Tag
          color={_.isEmpty(colors) ? "" : colors[tag]}
          key={tag}
          closable
          onClose={() => onTagDelete(tag)}
        >
          {tag}
        </Tag>
      ))}
      {dataSet.length > 0 && (
        <AddTag
          text={additionText}
          dataSet={dataSet}
          onSubmit={onTagCreation}
        />
      )}
    </div>
  );
};

export default TagList;
