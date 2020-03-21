import React, { useContext, KeyboardEvent } from "react";
import { message, Input } from "antd";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import { EDIT_SUCCESS_MESSAGE } from "../../consts";
import { Rule } from "antd/lib/form";
import EditableTextForm from "./EditableTextForm";
import TextArea from "antd/lib/input/TextArea";

interface PeopleTableEditableTextProps {
  initialValue: string;
  field: ConditionalProps<Person, string>;
  person: Person;
  rules?: Rule[];
  InputType?: typeof Input | typeof TextArea;
  textClassName?: string;
}

type InputEventType =
  | KeyboardEvent<HTMLInputElement>
  | KeyboardEvent<HTMLTextAreaElement>;

const EditableText: React.FC<PeopleTableEditableTextProps> = ({
  field,
  person,
  initialValue,
  rules = [],
  InputType = Input,
  textClassName = ""
}) => {
  const { updatePerson } = useContext(PeopleContext);

  const handleTextChange = (newValue: string) => {
    updatePerson({ ...person, [field]: newValue });
    message.success(EDIT_SUCCESS_MESSAGE);
  };

  /**
   * We want to submit the form only when enter is pressed in order to allow
   * the insertion of line breaks.
   * Currently you can insert a line break with shift + enter.
   */
  const handleEnterPress = (
    event: InputEventType,
    validateForm: () => void
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      validateForm();
    }
  };

  return (
    <EditableTextForm
      rules={rules}
      currentValue={initialValue}
      onSubmit={handleTextChange}
      textClassName={textClassName}
    >
      {(validateForm, toggleEditing) => (
        <InputType
          onDoubleClick={toggleEditing}
          autoFocus
          onBlur={toggleEditing}
          onPressEnter={(event: InputEventType) =>
            handleEnterPress(event, validateForm)
          }
        />
      )}
    </EditableTextForm>
  );
};

export default EditableText;
