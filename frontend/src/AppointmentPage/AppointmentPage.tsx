import React from "react";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import { AppointmentContextProvider } from "../contexts/AppointmentContext";
import { PeopleSettingsContextProvider } from "../contexts/PeopleSettingsContext";
import { PeopleContextProvider } from "../contexts/PeopleContext";

const AppointmentPage: React.FC = () => (
  <PeopleSettingsContextProvider>
    <PeopleContextProvider>
      <AppointmentContextProvider>
        <AppointmentTable />
      </AppointmentContextProvider>
    </PeopleContextProvider>
  </PeopleSettingsContextProvider>
);

export default AppointmentPage;
