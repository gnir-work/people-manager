import moment, { Moment } from "moment";

const getToday = () => moment().startOf("day");

export const beforeToday = (current: Moment) => current < getToday();

export const getStartOfDay = (momentObj: Moment) => momentObj.startOf("day");
