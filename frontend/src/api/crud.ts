import { CRUDApi } from "../types/api";
import axios from "axios";
import BasicData from "../types/data";

interface CreateCrudApiParameters<DataType extends BasicData> {
  url: string;
  parser?: (data: any) => DataType;
  serializer?: <K extends Omit<DataType, "id">>(data: K) => any;
}

/**
 * Creates an object containing all of the CRUD operations on a given data type.
 * The assumption is that there is a corresponding backend:
 * get: /url => GET Request.
 * update: /url/<id> => PUT Request.
 * create: /url + body params => POST Request.
 * delete: /url/<id> => DELETE Request.
 *
 * In case the data needs serializing and parsing please pass the relevant parser and serializer.
 */
export function createCrudApi<DataType extends BasicData>({
  url = "",
  parser = data => data,
  serializer = data => data
}: CreateCrudApiParameters<DataType>): CRUDApi<DataType> {
  const get = (): Promise<DataType[]> =>
    axios.get(url).then(response => response.data.map(parser));

  const update = <K extends keyof DataType>(
    appointment: DataType,
    field: K,
    value: DataType[K]
  ) => {
    const serializedValue = serializer({
      ...appointment,
      [field]: value
    })[field];

    return axios.put(`${url}/${appointment.id}`, {
      [field]: serializedValue
    });
  };

  const deleteFunction = (appointmentId: string) =>
    axios.delete(`${url}/${appointmentId}`);

  const add = (appointment: Omit<DataType, "id">) => {
    const serializedAppointment = serializer(appointment);
    return axios.post(url, serializedAppointment);
  };

  return {
    get,
    update,
    delete: deleteFunction,
    add
  };
}
