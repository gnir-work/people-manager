import React, { useContext, useCallback } from "react";
import { PeopleContext } from "../contexts/PeopleContext";
import { SiteSettingsContext } from "../contexts/SiteSettingsContext";
import FormModal, {
  ChildrenFunction as FormModalChildren
} from "../components/modals/FormModal";
import AddPersonForm from "./AddPersonForm";

const AddPersonModal: React.FC = () => {
  const { addData: addPerson, getFieldDataSet } = useContext(PeopleContext);
  const { settings } = useContext(SiteSettingsContext);
  const possibleTeams = getFieldDataSet("team");

  const handleSubmit = (values: Object) => {
    return addPerson(values as any);
  };

  const renderForm = useCallback(
    (formProps: FormModalChildren) => (
      <AddPersonForm
        settings={settings}
        possibleTeams={possibleTeams}
        {...formProps}
      />
    ),
    [settings, possibleTeams]
  );

  return (
    <FormModal onSubmit={handleSubmit} title="הוספת איש חוץ">
      {renderForm}
    </FormModal>
  );
};

export default AddPersonModal;
