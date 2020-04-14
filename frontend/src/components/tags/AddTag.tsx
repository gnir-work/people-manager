import React, { useState } from "react";
import { Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SelectValue } from "antd/lib/select";
import { FilterableAutoComplete } from "../fields/text/FilterableAutoComplete";

import "./AddTag.scss";

interface AddTagProps {
  possibleTags: string[];
  onSubmit: (newTag: string) => void;
  text: string;
}

const AddTag: React.FC<AddTagProps> = ({ possibleTags, onSubmit, text }) => {
  const [editing, setEditing] = useState(false);

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

  return editing ? (
    <FilterableAutoComplete
      autoFocus
      defaultOpen
      data={possibleTags}
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
