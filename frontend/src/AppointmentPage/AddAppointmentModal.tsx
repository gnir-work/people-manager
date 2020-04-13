import React, { useContext, useCallback } from "react";
import { PeopleSettingsContext } from "../contexts/PeopleSettingsContext";
import FormModal, {
  ChildrenFunction as FormModalChildren
} from "../components/modals/FormModal";
import { AppointmentContext } from "../contexts/AppointmentContext";
import AddAppointmentForm from "./AddAppointmentForm";

const AddAppointmentModal: React.FC = () => {
  const { addData: addAppointment } = useContext(AppointmentContext);
  const peopleSettings = useContext(PeopleSettingsContext);

  const handleSubmit = (values: Object) => {
    addAppointment(values as any);
  };

  const renderForm = useCallback(
    (formProps: FormModalChildren) => (
      <AddAppointmentForm settings={peopleSettings.settings} {...formProps} />
    ),
    [peopleSettings.settings]
  );

  return (
    <FormModal onSubmit={handleSubmit} title="הוספת זימון">
      {renderForm}
    </FormModal>
  );
};

export default AddAppointmentModal;
