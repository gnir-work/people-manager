import React, { createContext, useEffect, useState } from "react";
import {
  updateAppointmentRequest,
  deleteAppointmentRequest,
  createAppointmentRequest,
  getAppointments
} from "../api/appointment";
import _ from "lodash";
import { message } from "antd";
import { EDIT_SUCCESS_MESSAGE, EDIT_ERROR_MESSAGE } from "../consts";
import { AxiosError } from "axios";
import { Appointment } from "../types/appointment";
import {
  DataListContextInterface,
  getDataListContext,
  DataListContextProvider
} from "./DataListContext";

export interface AppointmentsContextInterface
  extends DataListContextInterface<Appointment> {}

export const AppointmentContext = getDataListContext<Appointment>();

const api = {
  get: getAppointments,
  add: createAppointmentRequest,
  update: updateAppointmentRequest,
  delete: deleteAppointmentRequest
};

/**
 * A context which handles all of the manipulation on the appointment dataset.
 * From fetching the data set to deleting or adding appointment.
 */
export const AppointmentContextProvider: React.FC = ({ children }) => {
  return (
    <DataListContextProvider api={api} DataListContext={AppointmentContext}>
      {children}
    </DataListContextProvider>
  );
};
