import React from "react";
import AppointmentTable from "./AppointmentTable/AppointmentTable";
import AddAppointmentModal from "./AddAppointmentModal";
import requireLogin from "../HOC/requireLogin";

const AppointmentPage: React.FC = () => (
  <>
    <AppointmentTable />
    <AddAppointmentModal />
  </>
);

export default requireLogin(AppointmentPage);
