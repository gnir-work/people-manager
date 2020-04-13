import React, {
  createContext,
  useEffect,
  useState,
  Context,
  ReactNode
} from "react";
import _ from "lodash";
import BasicData from "../types/data";
import { CRUDApi } from "../api/types";

/**
 * The API that the context providers to its children.
 */
export interface DataListContextInterface<DataType extends BasicData> {
  data: DataType[];
  deleteData: (dataToDelete: DataType) => void;
  getFieldDataSet: (field: keyof DataType) => any[];
  updateData: <K extends keyof DataType>(
    dataToUpdate: DataType,
    field: K,
    value: DataType[K]
  ) => void;
  addData: (newDataFields: Omit<DataType, "id">) => void;
  doesDataExist: (dataId: string) => boolean;
}

/**
 * A factory for creating a generic CRUD context (read more in the providers doc).
 * This is a function in order to allow generics over the type of the data.
 */
export function getDataListContext<DataType extends BasicData>() {
  const defaultData: DataListContextInterface<DataType> = {
    data: [],
    deleteData: (dataToDelete: DataType) => {},
    getFieldDataSet: (field: keyof DataType) => [],
    updateData: <K extends keyof DataType>(
      dataToUpdate: DataType,
      field: K,
      value: DataType[K]
    ) => {},
    addData: (newDataFields: Omit<DataType, "id">) => {},
    doesDataExist: (dataId: string) => false
  };
  return createContext(defaultData);
}

/**
 * The provider provides all of the functionality regarding CRUD operation between the client and server over a given list of data.
 * In order for this to work for your data list you need to do the following things:
 * 1. Create your interface and extend from BasicData interface.
 * 2. Write all of the api calls following the CRUDApi interface.
 *
 */
export function DataListContextProvider<DataType extends BasicData>({
  children,
  DataListContext,
  api
}: {
  children: ReactNode;
  DataListContext: Context<DataListContextInterface<DataType>>;
  api: CRUDApi<DataType>;
}) {
  const [dataList, setDataList]: [DataType[], Function] = useState([]);

  useEffect(() => {
    api.get().then((newData: DataType[]) => {
      setDataList(newData);
    });
  }, []);

  /**
   * Check if we already have a data with this id.
   * @param dataId The id of the data.
   */
  const doesDataExist = (dataId: string) => !!_.find(dataList, ["id", dataId]);

  /**
   * Deletes a specific data identified by id.
   *
   * @param dataToDelete The data to delete from the dataset.
   * @returns a boolean indicating the success of the operation.
   */
  const deleteData = (dataToDelete: DataType) => {
    return api.delete(dataToDelete.id).then(response => {
      const filteredData = dataList.filter(data => data.id !== dataToDelete.id);
      setDataList(filteredData);
    });
  };

  /**
   * Retrieves all of the unique values of a given field.
   * @param field The field from which the data set should be built
   */
  const getFieldDataSet = (field: keyof DataType) => {
    const fields = dataList.map((data: DataType) => data[field]);
    return _.uniq(fields);
  };

  /**
   * Update a specific data.
   */
  function updateData<K extends keyof DataType>(
    dataToUpdate: DataType,
    field: K,
    value: DataType[K]
  ) {
    return api.update(dataToUpdate.id, field, value).then(response => {
      const newDatum = { ...dataToUpdate, [field]: value };
      const newData = [
        ...dataList.map(data => (data.id === dataToUpdate.id ? newDatum : data))
      ];
      setDataList(newData);
    });
  }

  /**
   * Create new Data instance and append it to the current list.
   */
  const addData = (newDataFields: Omit<DataType, "id">) => {
    return api.add(newDataFields).then(response => {
      const newData = {
        ...newDataFields,
        id: response.data.id
      };
      setDataList([...dataList, newData]);
    });
  };

  return (
    <DataListContext.Provider
      value={{
        doesDataExist,
        addData: addData,
        data: dataList,
        deleteData: deleteData,
        getFieldDataSet,
        updateData: updateData
      }}
    >
      {children}
    </DataListContext.Provider>
  );
}
