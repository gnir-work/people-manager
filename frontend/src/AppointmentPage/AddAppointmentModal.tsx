import React, { useContext, useCallback } from "react";
import { PeopleContext } from "../contexts/PeopleContext";
import { PeopleSettingsContext } from "../contexts/PeopleSettingsContext";
import FormModal, {
  ChildrenFunction as FormModalChildren
} from "../components/modals/FormModal";
import { AppointmentContext } from "../contexts/AppointmentContext";
import AddAppointmentForm from "./AddAppointmentForm";

const AddAppointmentModal: React.FC = () => {
  const { addAppointment } = useContext(AppointmentContext);
  const handleSubmit = (values: Object) => {
    addAppointment(values as any);
  };

  const renderForm = useCallback(
    (formProps: FormModalChildren) => <AddAppointmentForm {...formProps} />,
    []
  );

  return (
    <FormModal onSubmit={handleSubmit} title="הוספת זימון">
      {renderForm}
    </FormModal>
  );
};

export default AddAppointmentModal;
