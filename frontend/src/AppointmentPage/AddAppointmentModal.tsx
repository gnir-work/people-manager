import React, { useContext, useCallback } from "react";
import { SiteSettingsContext } from "../contexts/SiteSettingsContext";
import FormModal, {
  ChildrenFunction as FormModalChildren
} from "../components/modals/FormModal";
import { AppointmentContext } from "../contexts/AppointmentContext";
import AddAppointmentForm from "./AddAppointmentForm";
import { Appointment } from "../types/appointment";
import { UserContext } from "../contexts/UserContext";

const AddAppointmentModal: React.FC = () => {
  const { addData: addAppointment } = useContext(AppointmentContext);
  const peopleSettings = useContext(SiteSettingsContext);
  const { username } = useContext(UserContext);

  const handleSubmit = (newAppointment: Appointment) => {
    return addAppointment(newAppointment);
  };

  const renderForm = useCallback(
    (formProps: FormModalChildren) => (
      <AddAppointmentForm
        settings={peopleSettings.settings}
        currentUser={username}
        {...formProps}
      />
    ),
    [peopleSettings.settings]
  );

  return (
    <FormModal onSubmit={handleSubmit as any} title="הוספת זימון">
      {renderForm}
    </FormModal>
  );
};

export default AddAppointmentModal;
