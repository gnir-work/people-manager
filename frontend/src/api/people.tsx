import _ from "lodash";
import moment from "moment";
import md5 from "md5";

import { Person, PersonPreferences, PersonStatuses } from "../types/person";

export const getPeople = (): Person[] =>
  _.range(1000).map(
    id =>
      new Person({
        team: "Pyro",
        status: PersonStatuses.Citizen,
        personalId: _.random(10000000, 99999999).toString(),
        fullName: "ניר גלר" + _.random(1, 100).toString(),
        remarks: "ששדגדשג"
      })
  );
