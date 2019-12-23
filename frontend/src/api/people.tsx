import _ from "lodash";

export interface PersonInterface {
    name: string;
    lastName: string;
    id: string;
    age: number;
}

export const getPeople = (): Array<PersonInterface> =>
    _.range(46).map(id => ({
        name: "ניר",
        lastName: "גלר",
        id: id.toString(),
        age: 21
    }));
