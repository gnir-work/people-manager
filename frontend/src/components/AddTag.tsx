import React, { useState } from "react";
import { AutoComplete, Tag, Icon } from "antd";
import { SelectValue } from "antd/lib/select";

import "./AddTag.scss";

interface AddTagProps {
  possibleTags: string[];
  onSubmit: Function;
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
    <AutoComplete
      autoFocus
      defaultOpen
      dataSource={possibleTags}
      onSelect={handleSelection}
      onBlur={toggleEditing}
    />
  ) : (
    <Tag onClick={toggleEditing} className="add-tag">
      <Icon type="plus" /> {text}
    </Tag>
  );
};

export default AddTag;
