import _ from "lodash";
import moment from "moment";

import { PersonInterface, AvailableBedStatuses, AvailableBasicStatuses } from "./types"


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
        entryPass: _.sample([AvailableBasicStatuses.Done,AvailableBasicStatuses.Pending]) || AvailableBasicStatuses.Done,
        verifiedArrival: _.sample([AvailableBasicStatuses.Done,AvailableBasicStatuses.Pending]) || AvailableBasicStatuses.Done,
        miluim: _.sample([AvailableBasicStatuses.Done,AvailableBasicStatuses.Pending]) || AvailableBasicStatuses.Done,
        makishur: _.sample([AvailableBasicStatuses.Done,AvailableBasicStatuses.Pending]) || AvailableBasicStatuses.Done,
        arrived: _.sample([AvailableBasicStatuses.Done,AvailableBasicStatuses.Pending]) || AvailableBasicStatuses.Done,
        megama: "פסטן",
        reason: "פסטן פסטן פסטן",
        remarks: "ששדגדשג שדג שדג שדג שדג שדג שדג שדגדשג שדג שדג שדג שדג שדג שדג שדגדשג שדג שדג שדג שדג שדג שדג דגדשג שדג שדג שדג שדג שדג שדג שדג שדג שדג שדג"
    }));
