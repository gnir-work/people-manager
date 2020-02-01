import {Moment} from "moment";

export enum AvailableBedStatuses {
    NoNeed,
    Searching,
    Found,
}

export enum AvailableBasicStatuses {
    Done,
    Pending,
}

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
    entryPass: AvailableBasicStatuses;
    verifiedArrival: AvailableBasicStatuses;
    miluim: AvailableBasicStatuses;
    makishur: AvailableBasicStatuses;
    arrived: AvailableBasicStatuses;
    megama: string;
    reason: string;
    remarks: string;
}