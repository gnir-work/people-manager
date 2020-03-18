import React, { useState } from "react";
import { AutoComplete, Tag } from "antd";
import { SelectValue } from "antd/lib/select";
import { TagProps } from "antd/lib/tag";
import classNames from "classnames";

interface EditableTagProps extends TagProps {
  possibleTags: string[];
  color?: string;
  onTagChange: (newTag: string) => void;
  onDelete?: () => void;
}

/**
 * An editable tag with multiple functionalities.
 * In case the tag can be deleted entirely and not only changed please pass a function
 * to handle that case to the onDelete prop.
 *
 * Please notice:
 * In case the tag is deletable, click the tag will prompt the user to change
 * its value while clicking the close icon will delete the tag.
 *
 * In case the tag isn't deletable clicking the tag or the close icon will prompt the user
 * to change the tags value.
 */
const EditableTag: React.FC<EditableTagProps> = ({
  possibleTags,
  color = "",
  onTagChange,
  children,
  onDelete = undefined
}) => {
  const [editing, setEditing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const filteredTags = possibleTags.filter(possibleTag =>
    possibleTag.includes(searchText)
  );

  const toggleEditing = () => {
    setEditing(!editing);
    setSearchText("");
  };

  const handleSelection = (value: SelectValue) => {
    onTagChange(value.toString());
    toggleEditing();
  };

  const handleChange = (value: SelectValue) => {
    setSearchText(value.toString());
  };

  const tagProps = onDelete
    ? {
        onClose: onDelete,
        onClick: toggleEditing
      }
    : {
        onClose: toggleEditing
      };

  return editing ? (
    <AutoComplete
      onChange={handleChange}
      dataSource={filteredTags}
      onSelect={handleSelection}
      defaultOpen
      onBlur={toggleEditing}
      value={searchText}
    />
  ) : (
    <Tag
      className={classNames({ clickable: onDelete })}
      color={color}
      closable
      {...tagProps}
    >
      {children}
    </Tag>
  );
};

export default EditableTag;
