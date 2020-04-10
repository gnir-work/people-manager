import React from "react";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import { AppointmentContextProvider } from "../contexts/AppointmentContext";
import { PeopleSettingsContextProvider } from "../contexts/PeopleSettingsContext";
import { PeopleContextProvider } from "../contexts/PeopleContext";
import AddAppointmentModal from "./AddAppointmentModal";

const AppointmentPage: React.FC = () => (
  <PeopleSettingsContextProvider>
    <PeopleContextProvider>
      <AppointmentContextProvider>
        <AppointmentTable />
        <AddAppointmentModal />
      </AppointmentContextProvider>
    </PeopleContextProvider>
  </PeopleSettingsContextProvider>
);

export default AppointmentPage;
