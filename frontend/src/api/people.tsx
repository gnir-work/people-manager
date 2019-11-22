export interface PersonInterface {
    name: string;
    lastName: string;
    id: string,
    age: number
}

export const getPeople = (): Array<PersonInterface> => [
    {
        name: "Nir",
        lastName: "Geller",
        id: "209499359",
        age: 21
    }
];
