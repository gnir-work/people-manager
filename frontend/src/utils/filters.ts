import _ from "lodash";
import { PersonInterface } from "../api/types";
import { ConditionalProps } from "./types";

/**
 * Checks if the person value of the property key contains the given value.
 * @param person The person that should be filtered.
 * @param value The value that should be part of the fields value.
 * @param field The field to check againts
 */
export const stringsFilterByField = (
    person: PersonInterface,
    value: string,
    field: ConditionalProps<PersonInterface, string>
) => person[field].toLowerCase().includes(value.toLowerCase());

export const numbersFilterByField = (
    person: PersonInterface,
    value: string,
    field: ConditionalProps<PersonInterface, number>
) => person[field] === parseInt(value);

/**
 * Convert a dict of mappings to antd filters format.
 * @param filters An dict mapping between the value and the text that should be shown in the filter.
 */
export const enumMappingToAntdFilters = (filters: { [key: number]: string }) =>
    _.keys(filters).map((value: string) => ({
        text: filters[parseInt(value)],
        value
    }));
