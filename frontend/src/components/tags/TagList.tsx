import React from "react";
import AddTag from "./AddTag";

import "./TagList.scss";
import _ from "lodash";
import EditableTag from "./EditableTag";

interface TagListProps {
  tags: string[];
  additionalPossibleTags: string[];
  colors?: {
    [color: string]: string;
  };
  additionText: string;
  onTagsChange: (newTags: string[]) => void;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  additionalPossibleTags,
  colors = {},
  onTagsChange,
  additionText
}) => {
  const handleTagDeletion = (tagToDelete: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToDelete));
  };

  const handleTagAddition = (newTag: string) => {
    onTagsChange([...tags, newTag]);
  };

  const handleTagChange = (oldTag: string, newTag: string) => {
    const FilteredTags = tags.filter(tag => tag !== oldTag);
    onTagsChange([...FilteredTags, newTag]);
  };

  return (
    <div className="tag-list">
      {tags.map(tag => (
        <EditableTag
          color={_.isEmpty(colors) ? "" : colors[tag]}
          key={tag}
          possibleTags={additionalPossibleTags}
          onDelete={() => handleTagDeletion(tag)}
          onTagChange={(newTag: string) => handleTagChange(tag, newTag)}
          closable
        >
          {tag}
        </EditableTag>
      ))}
      {additionalPossibleTags.length > 0 && (
        <AddTag
          text={additionText}
          possibleTags={additionalPossibleTags}
          onSubmit={handleTagAddition}
        />
      )}
    </div>
  );
};

export default TagList;
