import React, { useContext } from "react";
import _ from "lodash";
import { PersonPreference, Person } from "../../types/person";
import Flag from "../Flag";
import { personPreferenceToText } from "../../consts";

import "./PersonPreferences.scss";
import { SelectValue } from "antd/lib/select";
import { PeopleContext } from "../../contexts/PeopleContext";
import AddPreference from "./AddPreference";

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
      ([key, value]) =>
        !person.preferences.includes(Number.parseInt(key) as any)
    )
    .map(([key, value]) => value);

  const addNewPreference = (value: SelectValue) => {
    const newPreference = _.invert(personPreferenceToText)[value.toString()];
    const newPerson = {
      ...person,
      preferences: [...person.preferences, Number.parseInt(newPreference)]
    };
    updatePerson(newPerson);
  };

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
    <div>
      {person.preferences.map(preference => (
        <Flag<PersonPreference>
          key={preference}
          className="person-preference"
          current={preference}
          colors={preferenceToColor}
          texts={personPreferenceToText}
          closable
          onClose={() => deletePreference(preference)}
        />
      ))}
      {dataSet.length > 0 && (
        <AddPreference dataSet={dataSet} onSubmit={addNewPreference} />
      )}
    </div>
  );
};

export default PersonPreferenceTags;
