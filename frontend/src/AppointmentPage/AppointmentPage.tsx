import React from "react";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import { AppointmentContextProvider } from "../contexts/AppointmentContext";
import { PeopleSettingsContextProvider } from "../contexts/PeopleSettingsContext";

const AppointmentPage: React.FC = () => (
  <PeopleSettingsContextProvider>
    <AppointmentContextProvider>
      <AppointmentTable />;
    </AppointmentContextProvider>
  </PeopleSettingsContextProvider>
);

export default AppointmentPage;
