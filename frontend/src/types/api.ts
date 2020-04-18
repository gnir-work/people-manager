import BasicData from "./data";
import { AxiosResponse } from "axios";

/**
 * The expected API for the CRUD context.
 */
export interface CRUDApi<DataType extends BasicData> {
  get: () => Promise<DataType[]>;
  delete: (idToDelete: string) => Promise<AxiosResponse>;
  update: <K extends keyof DataType>(
    data: DataType,
    key: K,
    value: DataType[K]
  ) => Promise<AxiosResponse>;
  add: (newData: Omit<DataType, "id">) => Promise<AxiosResponse>;
}
