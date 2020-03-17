import React, { useContext } from "react";
import _ from "lodash";
import { PersonPreference, Person } from "../../types/person";
import { personPreferenceToText } from "../../consts";
import { SelectValue } from "antd/lib/select";
import { PeopleContext } from "../../contexts/PeopleContext";
import { arrayFilterByField } from "../../utils/filters";
import FlagList from "../FlagList";

interface PersonPreferenceTagsProps {
  person: Person;
}

const preferenceToColor = {
  [PersonPreference.ExerciseChecking]: "magenta",
  [PersonPreference.Lectures]: "blue",
  [PersonPreference.StayOverNight]: "green"
};

const PersonPreferenceTags: React.FC<PersonPreferenceTagsProps> = ({
  person
}) => {
  const { updatePerson } = useContext(PeopleContext);
  let dataSet = _.toPairs(personPreferenceToText)
    .filter(
      ([preference, text]) =>
        !arrayFilterByField(person, preference as any, "preferences")
    )
    .map(([preference, text]) => text);

  /**
   * Add the new preference to the current person
   * @param value
   */
  const addNewPreference = (value: SelectValue) => {
    const newPreference = _.invert(personPreferenceToText)[value.toString()];
    const newPerson = {
      ...person,
      preferences: [...person.preferences, newPreference]
    };
    updatePerson(newPerson);
  };

  /**
   * Delete the preference from the current person.
   * @param preferenceToDelete
   */
  const deletePreference = (preferenceToDelete: PersonPreference) => {
    const newPerson = {
      ...person,
      preferences: person.preferences.filter(
        preference => preference !== preferenceToDelete
      )
    };
    updatePerson(newPerson);
  };

  return (
    <FlagList
      flags={person.preferences}
      dataSet={dataSet}
      colorMapping={preferenceToColor}
      textMapping={personPreferenceToText}
      onFlagCreation={addNewPreference}
      onFlagDelete={deletePreference}
      additionText="הוספת העדפה"
    />
  );
};

export default PersonPreferenceTags;
