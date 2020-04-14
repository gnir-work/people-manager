import React from "react";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import AddAppointmentModal from "./AddAppointmentModal";

const AppointmentPage: React.FC = () => (
  <>
    <AppointmentTable />
    <AddAppointmentModal />
  </>
);

export default AppointmentPage;
