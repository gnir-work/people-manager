import React from "react";
import AddTag from "./AddTag";

import "./TagList.scss";
import _ from "lodash";
import EditableTag from "./EditableTag";

interface TagListProps {
  value?: string[];
  possibleTags: string[];
  colors?: {
    [color: string]: string;
  };
  additionText: string;
  onChange?: (newTags: string[]) => void;
}

const TagList: React.FC<TagListProps> = ({
  value: tags = [],
  possibleTags,
  colors = {},
  onChange = () => {},
  additionText
}) => {
  let unselectedTags = possibleTags.filter(tag => !tags.includes(tag));

  const handleTagDeletion = (tagToDelete: string) => {
    onChange(tags.filter(tag => tag !== tagToDelete));
  };

  const handleTagAddition = (newTag: string) => {
    onChange([...tags, newTag]);
  };

  const handleTagChange = (oldTag: string, newTag: string) => {
    const FilteredTags = tags.filter(tag => tag !== oldTag);
    onChange([...FilteredTags, newTag]);
  };

  return (
    <div className="tag-list">
      {tags.map(tag => (
        <EditableTag
          color={_.isEmpty(colors) ? "" : colors[tag]}
          key={tag}
          possibleTags={unselectedTags}
          onDelete={() => handleTagDeletion(tag)}
          onTagChange={(newTag: string) => handleTagChange(tag, newTag)}
          closable
        >
          {tag}
        </EditableTag>
      ))}
      {unselectedTags.length > 0 && (
        <AddTag
          text={additionText}
          possibleTags={unselectedTags}
          onSubmit={handleTagAddition}
        />
      )}
    </div>
  );
};

export default TagList;
