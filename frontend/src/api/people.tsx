import _ from "lodash";
import {Moment} from "moment";
import moment from "moment";

import { AvailableBedStatuses } from "../components/BedStatus"

export interface PersonInterface {
    fullName: string;
    personId: string;
    age: number;
    period: string;
    week: number;
    arrivalTime: Moment;
    departureTime: Moment;
    invitor: string;
    bed: AvailableBedStatuses;
    entryPass: boolean;
    verifiedArrival: boolean;
    miluim: boolean;
    makishur: boolean;
    arrived: boolean;
    megama: string;
    reason: string;
    remarks: string;
}

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
        entryPass: !!_.random(0,1),
        verifiedArrival: !!_.random(0,1),
        miluim: !!_.random(0,1),
        makishur: !!_.random(0,1),
        arrived: !!_.random(0,1),
        megama: "פסטן",
        reason: "פסטן פסטן פסטן",
        remarks: "ששדגדשג שדג שדג שדג שדג שדג שדג שדגדשג שדג שדג שדג שדג שדג שדג שדגדשג שדג שדג שדג שדג שדג שדג דגדשג שדג שדג שדג שדג שדג שדג שדג שדג שדג שדג"
    }));
