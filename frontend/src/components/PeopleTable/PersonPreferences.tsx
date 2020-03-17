import React, { useContext } from "react";
import _ from "lodash";
import { Person } from "../../types/person";
import { personPreferences, preferenceToColor } from "../../consts";
import { SelectValue } from "antd/lib/select";
import { PeopleContext } from "../../contexts/PeopleContext";
import FlagList from "../FlagList";

interface PersonPreferenceTagsProps {
  person: Person;
}

const PersonPreferenceTags: React.FC<PersonPreferenceTagsProps> = ({
  person
}) => {
  const { updatePerson } = useContext(PeopleContext);
  let dataSet = personPreferences.filter(
    preference => !person.preferences.includes(preference)
  );

  /**
   * Add the new preference to the current person
   * @param value
   */
  const addNewPreference = (value: SelectValue) => {
    const newPreference = value.toString();
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
  const deletePreference = (preferenceToDelete: string) => {
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
      colors={preferenceToColor}
      dataSet={dataSet}
      onFlagCreation={addNewPreference}
      onFlagDelete={deletePreference}
      additionText="הוספת העדפה"
    />
  );
};

export default PersonPreferenceTags;
