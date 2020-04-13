import moment, { Moment } from "moment";

const getToday = () => moment().startOf("day");

export const beforeToday = (current: Moment) => current < getToday();
