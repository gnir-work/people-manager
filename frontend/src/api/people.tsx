import _ from "lodash";

import { Person } from "../types/person";
import {
  personPreferences,
  personStatuses,
  megamut,
  subjects,
  availability
} from "../consts";

const getRandomNumberOfItemsFromList = (data: any[]) =>
  data.slice(0, _.random(0, data.length));

export const getPeople = (): Person[] =>
  _.range(1000).map(
    id =>
      new Person({
        team: "פיירו",
        status: _.sample(personStatuses) || personStatuses[0],
        phone: "053-0000000",
        personalId: _.random(10000000, 99999999).toString(),
        fullName: "ניר גלר" + _.random(1, 100).toString(),
        remarks: "ששדגדשג",
        preferences: getRandomNumberOfItemsFromList(personPreferences),
        megamut: getRandomNumberOfItemsFromList(megamut),
        subjects: getRandomNumberOfItemsFromList(subjects),
        availability: _.sample(availability) || availability[0]
      })
  );
