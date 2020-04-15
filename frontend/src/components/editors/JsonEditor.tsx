import React from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";

import "./JsonEditor.scss";
import "./editor.d.ts";
import "jsoneditor-react/es/editor.min.css";
import _ from "lodash";

interface JsonEditorProps {
  onChange: (newValue: { [key: string]: any }) => void;
  value: { [key: string]: any };
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  const validateNewValue = (newValue: { [key: string]: any }) => {
    if (!_.isEqual(_.keys(value), _.keys(newValue))) {
      return false;
    }

    return true;
  };

  const handleChange = (newValue: { [key: string]: any }) => {
    if (validateNewValue(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="json-editor-container">
      <Editor
        ace={ace}
        theme="ace/theme/github"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default JsonEditor;
