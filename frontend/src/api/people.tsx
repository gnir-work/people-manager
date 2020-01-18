import _ from "lodash";
import moment from "moment";

import { PersonInterface, AvailableBedStatuses, BasicStatus } from "./types"


export const getPeople = (): Array<PersonInterface> =>
    _.range(1000).map(id => ({
        personId: _.random(10000000, 99999999).toString(),
        fullName: "ניר גלר" + _.random(1, 100).toString(),
        age: 21,
        period: "Ahud",
        week: 7,
        arrivalTime: moment(),
        departureTime: moment(),
        invitor: "ניר גלר",
        bed: _.sample([AvailableBedStatuses.NoNeed, AvailableBedStatuses.Found, AvailableBedStatuses.Searching]) || AvailableBedStatuses.NoNeed,
        entryPass: _.sample([BasicStatus.Done,BasicStatus.Pending]) || BasicStatus.Done,
        verifiedArrival: _.sample([BasicStatus.Done,BasicStatus.Pending]) || BasicStatus.Done,
        miluim: _.sample([BasicStatus.Done,BasicStatus.Pending]) || BasicStatus.Done,
        makishur: _.sample([BasicStatus.Done,BasicStatus.Pending]) || BasicStatus.Done,
        arrived: _.sample([BasicStatus.Done,BasicStatus.Pending]) || BasicStatus.Done,
        megama: "פסטן",
        reason: "פסטן פסטן פסטן",
        remarks: "ששדגדשג שדג שדג שדג שדג שדג שדג שדגדשג שדג שדג שדג שדג שדג שדג שדגדשג שדג שדג שדג שדג שדג שדג דגדשג שדג שדג שדג שדג שדג שדג שדג שדג שדג שדג"
    }));
