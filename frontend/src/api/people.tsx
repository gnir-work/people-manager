import _ from "lodash";

import { Person, PersonStatuses, PersonPreference } from "../types/person";

const getRandomNumberOfPreferences = () => {
  const numberOfPreferences = _.random(0, 3);
  let preferences: PersonPreference[] = [];

  if (numberOfPreferences > 0) {
    preferences.push(PersonPreference.ExerciseChecking);
  }
  if (numberOfPreferences > 1) {
    preferences.push(PersonPreference.StayOverNight);
  }
  if (numberOfPreferences > 2) {
    preferences.push(PersonPreference.Lectures);
  }

  return preferences;
};

export const getPeople = (): Person[] =>
  _.range(1000).map(
    id =>
      new Person({
        team: "פיירו",
        status: PersonStatuses.Citizen,
        phone: "053-0000000",
        personalId: _.random(10000000, 99999999).toString(),
        fullName: "ניר גלר" + _.random(1, 100).toString(),
        remarks: "ששדגדשג",
        preferences: getRandomNumberOfPreferences()
      })
  );
