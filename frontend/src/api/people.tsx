import _ from "lodash";
import {Moment} from "moment";
import moment from "moment";

export interface PersonInterface {
    fullName: string;
    personId: string;
    age: number;
    period: string;
    week: number;
    arrivalTime: Moment;
    departureTime: Moment;
    invitor: string;
    bed: string;
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
        fullName: "ניר גלר",
        age: 21,
        period: "Ahud",
        week: 7,
        arrivalTime: moment(),
        departureTime: moment(),
        invitor: "gnir",
        bed: "לא צריך",
        entryPass: !!_.random(0,1),
        verifiedArrival: !!_.random(0,1),
        miluim: !!_.random(0,1),
        makishur: !!_.random(0,1),
        arrived: !!_.random(0,1),
        megama: "פסטן",
        reason: "פסטן פסטן פסטן",
        remarks: "שדגדשג שדג שדג שדג שדג שדג שדג שדג שדג שדג שדג"
    }));
