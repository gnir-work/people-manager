import React, { KeyboardEvent } from "react";
import { Input } from "antd";

import { Rule } from "antd/lib/form";
import EditableTextForm from "./EditableTextForm";
import TextArea from "antd/lib/input/TextArea";

export interface EditableTextProps {
  initialValue: string;
  onChange: (newValue: string) => void;
  rules?: Rule[];
  InputType?: typeof Input | typeof TextArea;
  textClassName?: string;
}

type InputEventType =
  | KeyboardEvent<HTMLInputElement>
  | KeyboardEvent<HTMLTextAreaElement>;

const EditableText: React.FC<EditableTextProps> = ({
  onChange,
  initialValue,
  rules = [],
  InputType = Input,
  textClassName = ""
}) => {
  /**
   * We want to submit the form only when enter is pressed in order to allow
   * the insertion of line breaks.
   * Currently you can insert a line break with shift + enter.
   */
  const handleEnterPress = (event: InputEventType, submitForm: () => void) => {
    if (event.key === "Enter" && !event.shiftKey) {
      submitForm();
    }
  };

  return (
    <EditableTextForm
      rules={rules}
      currentValue={initialValue}
      onSubmit={onChange}
      textClassName={textClassName}
    >
      {(submitForm, toggleEditing) => (
        <InputType
          onDoubleClick={toggleEditing}
          autoFocus
          onBlur={toggleEditing}
          onPressEnter={(event: InputEventType) =>
            handleEnterPress(event, submitForm)
          }
        />
      )}
    </EditableTextForm>
  );
};

export default EditableText;
