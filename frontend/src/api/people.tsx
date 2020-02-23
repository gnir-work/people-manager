import _ from "lodash";
import moment from "moment";
import md5 from "md5";

import {
  PersonInterface,
  AvailableBedStatuses,
  AvailableBasicStatuses
} from "./types";

const generatePersonId = (person: PersonInterface) =>
  md5(
    `${
      person.personId
    } ${person.arrivalTime.unix()} ${person.departureTime.unix()}`
  );

export const getPeople = (): Array<PersonInterface> =>
  _.range(1000)
    .map(id => ({
      // TODO: remove the temp id when we move to backend
      _id: "temp",
      personId: _.random(10000000, 99999999).toString(),
      fullName: "ניר גלר" + _.random(1, 100).toString(),
      age: 21,
      period: "Ahud",
      week: _.random(1, 11),
      arrivalTime: moment().day(_.random(1, 10)),
      departureTime: moment(),
      invitor: "ניר גלר",
      bed:
        _.sample([
          AvailableBedStatuses.NoNeed,
          AvailableBedStatuses.Found,
          AvailableBedStatuses.Searching
        ]) || AvailableBedStatuses.NoNeed,
      entryPass:
        _.sample([
          AvailableBasicStatuses.Done,
          AvailableBasicStatuses.Pending
        ]) || AvailableBasicStatuses.Done,
      verifiedArrival:
        _.sample([
          AvailableBasicStatuses.Done,
          AvailableBasicStatuses.Pending
        ]) || AvailableBasicStatuses.Done,
      miluim:
        _.sample([
          AvailableBasicStatuses.Done,
          AvailableBasicStatuses.Pending
        ]) || AvailableBasicStatuses.Done,
      makishur:
        _.sample([
          AvailableBasicStatuses.Done,
          AvailableBasicStatuses.Pending
        ]) || AvailableBasicStatuses.Done,
      arrived:
        _.sample([
          AvailableBasicStatuses.Done,
          AvailableBasicStatuses.Pending
        ]) || AvailableBasicStatuses.Done,
      megama: "פסטן",
      reason: "פסטן פסטן פסטן",
      remarks: "ששדגדשג"
    }))
    .map(person => ({ ...person, _id: generatePersonId(person) }));
