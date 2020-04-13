import React, {
  createContext,
  useEffect,
  useState,
  ReactChildren,
  Context,
  ReactNode
} from "react";
import _ from "lodash";
import { AxiosResponse } from "axios";
import BasicData from "../types/data";

export interface DataListApi<DataType extends BasicData> {
  get: () => Promise<DataType[]>;
  delete: (idToDelete: string) => Promise<AxiosResponse>;
  update: <K extends keyof DataType>(
    idToUpdate: string,
    key: K,
    value: DataType[K]
  ) => Promise<AxiosResponse>;
  add: (newData: Omit<DataType, "id">) => Promise<AxiosResponse>;
}

export interface DataListContextInterface<DataType extends BasicData> {
  data: DataType[];
  deleteData: (personToDelete: DataType) => void;
  getFieldDataSet: (field: keyof DataType) => any[];
  updateData: <K extends keyof DataType>(
    personToUpdate: DataType,
    field: K,
    value: DataType[K]
  ) => void;
  addData: (newDataFields: Omit<DataType, "id">) => void;
  doesDataExist: (dataId: string) => boolean;
}

export function getDataListContext<DataType extends BasicData>() {
  const defaultData: DataListContextInterface<DataType> = {
    data: [],
    deleteData: (personToDelete: DataType) => {},
    getFieldDataSet: (field: keyof DataType) => [],
    updateData: <K extends keyof DataType>(
      personToUpdate: DataType,
      field: K,
      value: DataType[K]
    ) => {},
    addData: (newDataFields: Omit<DataType, "id">) => {},
    doesDataExist: (dataId: string) => false
  };
  return createContext(defaultData);
}

/**
 * A context which handles all of the manipulation on the people dataset.
 * From fetching the data set to deleting or adding people.
 */
export function DataListContextProvider<DataType extends BasicData>({
  children,
  DataListContext,
  api
}: {
  children: ReactNode;
  DataListContext: Context<DataListContextInterface<DataType>>;
  api: DataListApi<DataType>;
}) {
  const [dataList, setDataList]: [DataType[], Function] = useState([]);

  useEffect(() => {
    api.get().then((newData: DataType[]) => {
      setDataList(newData);
    });
  }, []);

  /**
   * Check if we already have a person with this id.
   * @param personId The id of the person.
   */
  const doesDataExist = (dataId: string) => !!_.find(dataList, ["id", dataId]);

  /**
   * Deletes a specific person identified by id.
   *
   * @param dataToDelete The person to delete from the dataset.
   * @returns a boolean indicating the success of the operation.
   */
  const deleteData = (dataToDelete: DataType) => {
    return api.delete(dataToDelete.id).then(response => {
      const filteredPeople = dataList.filter(
        person => person.id !== dataToDelete.id
      );
      setDataList(filteredPeople);
    });
  };

  /**
   * Retrieves all of the unique values of a given field.
   * @param field The field from which the data set should be built
   */
  const getFieldDataSet = (field: keyof DataType) => {
    const fields = dataList.map((person: DataType) => person[field]);
    return _.uniq(fields);
  };

  /**
   * Update a specific person.
   */
  function updateData<K extends keyof DataType>(
    personToUpdate: DataType,
    field: K,
    value: DataType[K]
  ) {
    return api.update(personToUpdate.id, field, value).then(response => {
      const newPerson = { ...personToUpdate, [field]: value };
      const newPeople = [
        ...dataList.map(person =>
          person.id === personToUpdate.id ? newPerson : person
        )
      ];
      setDataList(newPeople);
    });
  }

  /**
   * Create new Person
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
