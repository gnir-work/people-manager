import React from "react";
import AddTag from "./AddTag";

import "./TagList.scss";
import _ from "lodash";
import EditableTag from "./EditableTag";

interface TagListProps {
  tags?: string[];
  possibleTags: string[];
  colors?: {
    [color: string]: string;
  };
  additionText: string;
  onChange?: (newTags: string[]) => void;
}

const TagList: React.FC<TagListProps> = ({
  tags = [],
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

  /**
   * We want the current value of the tag to be a possible value that the user
   * can select because of the following:
   * In case there are no other options (All of the possibleTags are selected) when a person
   * clicks a tag to edit it its weird that there are no options, it looks a lot better
   * if the current value is available.
   * @param currentTag The current value of the editable tag.
   */
  const getEditableTagPossibleTags = (currentTag: string) => [
    ...unselectedTags,
    currentTag
  ];

  return (
    <div className="tag-list">
      {tags.map(tag => (
        <EditableTag
          color={_.isEmpty(colors) ? "" : colors[tag]}
          key={tag}
          possibleTags={getEditableTagPossibleTags(tag)}
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
