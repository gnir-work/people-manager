import React from "react";
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
