import React, {
  createContext,
  useEffect,
  useState,
  Context,
  ReactNode
} from "react";
import _ from "lodash";
import BasicData from "../types/data";
import { CRUDApi } from "../types/api";
import { message } from "antd";

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
  addData: (newDataFields: Omit<DataType, "id">) => Promise<void>;
  doesDataExist: (dataId: string) => boolean;
  loading: boolean;
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
    addData: (newDataFields: Omit<DataType, "id">) => new Promise(() => {}),
    doesDataExist: (dataId: string) => false,
    loading: true
  };
  return createContext(defaultData);
}

/**
 * The provider provides all of the functionality regarding CRUD operation between the client and server over a given list of data.
 * In order for this to work for your data list you need to do the following things:
 * 1. Create your interface and extend from BasicData interface.
 * 2. Use createCrudApi in order to create your api.
 * Look at PeopleContext and Person interface for an example.
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get()
      .then((newData: DataType[]) => {
        setDataList(newData);
        setLoading(false);
      })
      .catch(() => {
        message.error("היית שגיאה בשליפת המידע");
      });
  }, [api]);

  /**
   * Check if we already have a data with this id.
   * @param dataId The id of the data.
   */
  const doesDataExist = (dataId: string) => !!_.find(dataList, ["id", dataId]);

  /**
   * Deletes a specific data identified by id.
   *
   * @param dataToDelete The data to delete from the dataset.
   * @returns a promise that can be used to followup success.
   */
  const deleteData = (dataToDelete: DataType) => {
    return api
      .delete(dataToDelete.id)
      .then(response => {
        const filteredData = dataList.filter(
          data => data.id !== dataToDelete.id
        );
        setDataList(filteredData);
        message.success("האובייקט נמחק בהצלחה");
      })
      .catch(() => {
        message.error("היית שגיאה");
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
   * We update a specific key and not just dump the whole object to the server in order to minimize overrides in case the same data
   * was edited from to different clients.
   * @returns a promise that can be used to followup success.
   */
  function updateData<K extends keyof DataType>(
    dataToUpdate: DataType,
    field: K,
    value: DataType[K]
  ) {
    return api
      .update(dataToUpdate, field, value)
      .then(() => {
        const newDatum = { ...dataToUpdate, [field]: value };
        const newData = [
          ...dataList.map(data =>
            data.id === dataToUpdate.id ? newDatum : data
          )
        ];
        setDataList(newData);
      })
      .catch(error => {
        if (error.response?.status === 409) {
          message.error("כבר קיים אובייקט כזה");
        } else {
          message.error("היית שגיאה");
        }
      });
  }

  /**
   * Create new Data instance and append it to the current list.
   * @returns a promise that can be used to followup success.
   */
  const addData = (newDataFields: Omit<DataType, "id">) => {
    return api
      .add(newDataFields)
      .then(response => {
        const newData = {
          ...newDataFields,
          id: response.data.id
        };
        setDataList([...dataList, newData]);
        message.success("האובייקט נוצר בהצלחה");
      })
      .catch(error => {
        if (error.response?.status === 409) {
          message.error("כבר קיימת רשומה כזו");
        } else {
          message.error("היית שגיאה");
        }
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
        updateData: updateData,
        loading
      }}
    >
      {children}
    </DataListContext.Provider>
  );
}
