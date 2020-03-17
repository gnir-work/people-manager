import React, { useState } from "react";
import { AutoComplete, Tag } from "antd";
import { SelectValue } from "antd/lib/select";

interface EditableTagProps {
  possibleTags: string[];
  color?: string;
  onTagChange: (tag: string) => void;
}

const EditableTag: React.FC<EditableTagProps> = ({
  possibleTags,
  color = "",
  onTagChange,
  children
}) => {
  const [editing, setEditing] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  return editing ? (
    <AutoComplete
      onChange={handleChange}
      dataSource={possibleTags.filter(possibleTag =>
        possibleTag.includes(searchText)
      )}
      onSelect={handleSelection}
      defaultOpen
      onBlur={toggleEditing}
      value={searchText}
    />
  ) : (
    <Tag color={color} closable onClose={toggleEditing}>
      {children}
    </Tag>
  );
};

export default EditableTag;
