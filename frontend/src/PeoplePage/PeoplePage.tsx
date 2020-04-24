import React from "react";
import PeopleTable from "./PeopleTable/PeopleTable";
import AddPersonModal from "./AddPersonModal";
import requireLogin from "../HOC/requireLogin";

const PeoplePage: React.FC = () => (
  <>
    <PeopleTable className="people-manager-table" />
    <AddPersonModal />
  </>
);

export default requireLogin(PeoplePage);
