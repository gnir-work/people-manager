import React, { useContext } from "react";
import { Person } from "../../types/person";
import { PeopleContext } from "../../contexts/PeopleContext";
import TagList from "../tags/TagList";
import { ConditionalProps } from "../../utils/types";
import { message } from "antd";
import { EDIT_SUCCESS_MESSAGE } from "../../consts";

interface PersonPreferenceTagsProps {
  person: Person;
  field: ConditionalProps<Person, Array<any>>;
  possibleTags: string[];
  colors?: {
    [color: string]: string;
  };
}

const PersonTags: React.FC<PersonPreferenceTagsProps> = ({
  person,
  field,
  possibleTags,
  colors = {}
}) => {
  const { updatePerson } = useContext(PeopleContext);

  /**
   * Add the new tag to the current person
   * @param value
   */
  const handleTagsChange = (newTags: string[]) => {
    const newPerson = {
      ...person,
      [field]: newTags
    };
    updatePerson(newPerson);
    message.success(EDIT_SUCCESS_MESSAGE);
  };

  return (
    <TagList
      tags={person[field]}
      colors={colors}
      possibleTags={possibleTags}
      onChange={handleTagsChange}
      additionText="הוספת העדפה"
    />
  );
};

export default PersonTags;
