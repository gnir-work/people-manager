import React, { useContext } from "react";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ConditionalProps } from "../../utils/types";

import EditableText, {
  EditableTextProps
} from "../../components/text/EditableText";

interface PeopleTableEditableTextProps
  extends Omit<EditableTextProps, "onChange"> {
  field: ConditionalProps<Person, string>;
  person: Person;
}

const EditableTextWithPersonContext: React.FC<PeopleTableEditableTextProps> = ({
  field,
  person,
  ...editableTextProps
}) => {
  const { updatePerson } = useContext(PeopleContext);

  const handleTextChange = (newValue: string) => {
    updatePerson(person, field, newValue);
  };

  return <EditableText onChange={handleTextChange} {...editableTextProps} />;
};

export default EditableTextWithPersonContext;
