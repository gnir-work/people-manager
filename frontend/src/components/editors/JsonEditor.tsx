import React from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";

import "./JsonEditor.scss";
import "./editor.d.ts";
import "jsoneditor-react/es/editor.min.css";
import _ from "lodash";
import { compareJsonSchema } from "../../utils/equality";

interface JsonEditorProps {
  onChange: (newValue: { [key: string]: any }) => void;
  onError: (containsError: boolean) => void;
  value: { [key: string]: any };
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  onError
}) => {
  const handleChange = (newValue: { [key: string]: any }) => {
    if (compareJsonSchema(value, newValue)) {
      onError(false);
      onChange(newValue);
    } else {
      onError(true);
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
