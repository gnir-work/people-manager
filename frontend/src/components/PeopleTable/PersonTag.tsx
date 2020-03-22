import React, { useContext } from "react";
import EditableTag from "../tags/EditableTag";
import { PeopleContext } from "../../contexts/PeopleContext";
import { Person } from "../../types/person";
import { ConditionalProps } from "../../utils/types";
import { message } from "antd";
import { EDIT_SUCCESS_MESSAGE } from "../../consts";

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
    updatePerson(person, field, newTag);
    message.success(EDIT_SUCCESS_MESSAGE);
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
