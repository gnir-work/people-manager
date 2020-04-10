import React, { useContext } from "react";
import { Appointment } from "../../types/appointment";
import { AppointmentContext } from "../../contexts/AppointmentContext";
import DeleteButton from "../../components/actions/DeleteButton";

interface AppointmentDeleteButtonProps {
  appointment: Appointment;
}

const AppointmentDeleteButton: React.FC<AppointmentDeleteButtonProps> = ({
  appointment
}) => {
  const { deleteAppointment } = useContext(AppointmentContext);
  return (
    <DeleteButton
      confirmationMessage={`למחוק את הזימון של ${appointment.person.fullName}?`}
      onDelete={() => deleteAppointment(appointment)}
    />
  );
};

export default AppointmentDeleteButton;
