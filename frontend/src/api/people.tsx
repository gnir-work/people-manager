import _ from "lodash";

import { Person } from "../types/person";
import {
  PERSON_PREFERENCES,
  PERSON_STATUSES,
  TRACKS,
  SUBJECTS,
  AVAILABILITY
} from "../consts";

const getRandomNumberOfItemsFromList = (data: any[]) =>
  data.slice(0, _.random(0, data.length));

export const getPeople = (): Person[] =>
  _.range(1000).map(
    id =>
      new Person({
        team: "פיירו",
        status: _.sample(PERSON_STATUSES) || PERSON_STATUSES[0],
        phone: "053-0000000",
        personalId: _.random(10000000, 99999999).toString(),
        fullName: "ניר גלר" + _.random(1, 100).toString(),
        remarks: "ששדגדשג",
        preferences: getRandomNumberOfItemsFromList(PERSON_PREFERENCES),
        tracks: getRandomNumberOfItemsFromList(TRACKS),
        subjects: getRandomNumberOfItemsFromList(SUBJECTS),
        availability: _.sample(AVAILABILITY) || AVAILABILITY[0],
        wasSegel: _.sample([true, false])
      })
  );
