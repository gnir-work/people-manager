import React, { useContext, KeyboardEvent } from "react";
import { message, AutoComplete } from "antd";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import { EDIT_SUCCESS_MESSAGE } from "../../consts";
import { Rule } from "antd/lib/form";
import EditableTextForm from "./EditableTextForm";

interface EditableTextAutoCompleteProps {
  initialValue: string;
  field: ConditionalProps<Person, string>;
  person: Person;
  rules?: Rule[];
}

const EditableTextAutoComplete: React.FC<EditableTextAutoCompleteProps> = ({
  field,
  person,
  initialValue,
  rules = []
}) => {
  const { updatePerson, getFieldDataSet } = useContext(PeopleContext);
  const dataSet = getFieldDataSet(field);

  const handleTextChange = (newValue: string) => {
    updatePerson({ ...person, [field]: newValue });
    message.success(EDIT_SUCCESS_MESSAGE);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    validateForm: () => void
  ) => {
    if (event.key === "Enter") {
      validateForm();
    }
  };

  return (
    <EditableTextForm
      rules={rules}
      currentValue={initialValue}
      onSubmit={handleTextChange}
    >
      {(validateForm, toggleEditing) => (
        <AutoComplete
          options={dataSet.map(data => ({ value: data }))}
          defaultValue={initialValue}
          autoFocus
          onBlur={toggleEditing}
          onSelect={validateForm}
          onKeyDown={event => handleKeyDown(event, validateForm)}
        />
      )}
    </EditableTextForm>
  );
};

export default EditableTextAutoComplete;
