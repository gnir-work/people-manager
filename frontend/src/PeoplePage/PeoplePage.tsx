import React from "react";
import { PeopleContextProvider } from "../contexts/PeopleContext";
import { PeopleSettingsContextProvider } from "../contexts/PeopleSettingsContext";
import PeopleTable from "./PeopleTable/PeopleTable";
import AddPersonModal from "./AddPersonModal";

import "./PeoplePage.scss";

const PeoplePage: React.FC = () => (
  <PeopleContextProvider>
    <PeopleSettingsContextProvider>
      <PeopleTable className="people-manager-table" />
      <AddPersonModal />
    </PeopleSettingsContextProvider>
  </PeopleContextProvider>
);

export default PeoplePage;
