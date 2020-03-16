import React from "react";
import { PersonPreference } from "../../types/person";
import Flag from "../Flag";
import { personPreferenceToText } from "../../consts";

import "./PersonPreferences.scss";

interface PersonPreferenceTagsProps {
  preferences: PersonPreference[];
}

const preferenceToColor = {
  [PersonPreference.ExerciseChecking]: "magenta",
  [PersonPreference.Lectures]: "blue",
  [PersonPreference.StayOverNight]: "green"
};

const PersonPreferenceTags: React.FC<PersonPreferenceTagsProps> = ({
  preferences
}) => (
  <div>
    {preferences.map(preference => (
      <Flag<PersonPreference>
        key={preference}
        className="person-preference"
        current={preference}
        colors={preferenceToColor}
        texts={personPreferenceToText}
      />
    ))}
  </div>
);

export default PersonPreferenceTags;
