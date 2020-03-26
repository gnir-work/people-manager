import React from "react";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import { AppointmentContextProvider } from "../contexts/AppointmentContext";

const AppointmentPage: React.FC = () => (
  <AppointmentContextProvider>
    <AppointmentTable />;
  </AppointmentContextProvider>
);

export default AppointmentPage;
