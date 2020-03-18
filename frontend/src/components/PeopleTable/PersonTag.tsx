import React, { useContext } from "react";
import EditableTag from "../EditableTag";
import { PeopleContext } from "../../contexts/PeopleContext";
import { Person } from "../../types/person";
import { ConditionalProps } from "../../utils/types";
import { message } from "antd";

export interface PersonTag {
  person: Person;
  field: ConditionalProps<Person, string>;
  colors?: {
    [color: string]: string;
  };
  possibleTags: string[];
}

const PersonTag: React.FC<PersonTag> = ({
  person,
  field,
  colors = {},
  possibleTags
}) => {
  const { updatePerson } = useContext(PeopleContext);

  const handleTagChange = (newTag: string) => {
    const newPerson = {
      ...person,
      [field]: newTag
    };
    updatePerson(newPerson);
    message.success("שדה עודכן בהצלחה");
  };

  return (
    <EditableTag
      onTagChange={handleTagChange}
      possibleTags={possibleTags}
      color={colors[person[field]]}
    >
      {person[field]}
    </EditableTag>
  );
};

export default PersonTag;
