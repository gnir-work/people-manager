import React from "react";
import _ from "lodash";
import { Appointment } from "../types/appointment";
import {
  DataListContextInterface,
  getDataListContext,
  DataListContextProvider
} from "./DataListContext";
import { createCrudApi } from "../api/crud";
import { parseAppointment } from "../utils/parsers";
import { serializeAppointment } from "../utils/serializers";

export interface AppointmentsContextInterface
  extends DataListContextInterface<Appointment> {}

export const AppointmentContext = getDataListContext<Appointment>();

const appointmentCrudApi = createCrudApi<Appointment>({
  url: "/api/appointments/appointment",
  parser: parseAppointment,
  serializer: serializeAppointment
});

/**
 * A context which handles all of the manipulation on the appointment dataset.
 * From fetching the data set to deleting or adding appointment.
 */
export const AppointmentContextProvider: React.FC = ({ children }) => {
  return (
    <DataListContextProvider
      api={appointmentCrudApi}
      DataListContext={AppointmentContext}
    >
      {children}
    </DataListContextProvider>
  );
};
