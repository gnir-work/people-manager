import React, { useContext, useCallback } from "react";
import { PeopleContext } from "../contexts/PeopleContext";
import { PeopleSettingsContext } from "../contexts/PeopleSettingsContext";
import FormModal, {
  ChildrenFunction as FormModalChildren
} from "../components/modals/FormModal";
import AddPersonForm from "./AddPersonForm";

const AddPersonModal: React.FC = () => {
  const {
    addData: addPerson,
    doesDataExist: doesPersonExist,
    getFieldDataSet
  } = useContext(PeopleContext);
  const { settings } = useContext(PeopleSettingsContext);
  const possibleTeams = getFieldDataSet("team");

  const handleSubmit = (values: Object) => {
    addPerson(values as any);
  };

  const renderForm = useCallback(
    (formProps: FormModalChildren) => (
      <AddPersonForm
        settings={settings}
        possibleTeams={possibleTeams}
        doesPersonExist={doesPersonExist}
        {...formProps}
      />
    ),
    [settings, possibleTeams, doesPersonExist]
  );

  return (
    <FormModal onSubmit={handleSubmit} title="Hello">
      {renderForm}
    </FormModal>
  );
};

export default AddPersonModal;
