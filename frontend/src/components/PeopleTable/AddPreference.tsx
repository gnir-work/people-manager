import React, { useState } from "react";
import { AutoComplete, Tag, Icon } from "antd";
import { SelectValue } from "antd/lib/select";

import "./AddPreference.scss";

interface AddPreferenceProps {
  dataSet: string[];
  onSubmit: Function;
}

const AddPreference: React.FC<AddPreferenceProps> = ({ dataSet, onSubmit }) => {
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
      ref={(instance: AutoComplete) => {
        if (instance) {
          instance.focus();
        }
      }}
      defaultOpen
      dataSource={dataSet}
      onSelect={handleSelection}
      onBlur={toggleEditing}
    />
  ) : (
    <Tag onClick={toggleEditing} className="add-preference">
      <Icon type="plus" /> הוספת העדפה
    </Tag>
  );
};

export default AddPreference;
