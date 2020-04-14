import React from "react";
import PeopleTable from "./PeopleTable/PeopleTable";
import AddPersonModal from "./AddPersonModal";

const PeoplePage: React.FC = () => (
  <>
    <PeopleTable className="people-manager-table" />
    <AddPersonModal />
  </>
);

export default PeoplePage;
