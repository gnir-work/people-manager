import React, { useState, useEffect } from "react";
import { AutoComplete, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SelectValue } from "antd/lib/select";

import "./AddTag.scss";

interface AddTagProps {
  possibleTags: string[];
  onSubmit: (newTag: string) => void;
  text: string;
}

const AddTag: React.FC<AddTagProps> = ({ possibleTags, onSubmit, text }) => {
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState("");
  const filteredTags = possibleTags.filter(tag => tag.includes(filter));

  /**
   * We want a fresh filter each time we enter or exit the filtering state.
   */
  useEffect(() => {
    setFilter("");
  }, [editing]);

  /**
   * Handle the selection of a value from the auto complete.
   * @param value
   */
  const handleSelection = (value: SelectValue) => {
    setEditing(false);
    onSubmit(value.toString());
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleChange = (newFilter: SelectValue) => {
    setFilter(newFilter.toString());
  };

  return editing ? (
    <AutoComplete
      onChange={handleChange}
      autoFocus
      defaultOpen
      dataSource={filteredTags}
      onSelect={handleSelection}
      onBlur={toggleEditing}
    />
  ) : (
    <Tag onClick={toggleEditing} className="clickable add-tag">
      <PlusOutlined /> {text}
    </Tag>
  );
};

export default AddTag;
