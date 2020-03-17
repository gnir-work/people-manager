import React, { useContext } from "react";
import _ from "lodash";
import { Person } from "../../types/person";
import { SelectValue } from "antd/lib/select";
import { PeopleContext } from "../../contexts/PeopleContext";
import TagList from "../TagList";
import { ConditionalProps } from "../../utils/types";

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
  let dataSet = possibleTags.filter(tag => !person[field].includes(tag));

  /**
   * Add the new tag to the current person
   * @param value
   */
  const addNewTag = (value: SelectValue) => {
    const newTag = value.toString();
    const newPerson = {
      ...person,
      preferences: [...person[field], newTag]
    };
    updatePerson(newPerson);
  };

  /**
   * Delete the tag from the current person.
   * @param tagToDelete
   */
  const deleteTag = (tagToDelete: string) => {
    const newPerson = {
      ...person,
      [field]: person[field].filter(tag => tag !== tagToDelete)
    };
    updatePerson(newPerson);
  };

  return (
    <TagList
      tags={person[field]}
      colors={colors}
      dataSet={dataSet}
      onTagCreation={addNewTag}
      onTagDelete={deleteTag}
      additionText="הוספת העדפה"
    />
  );
};

export default PersonTags;
