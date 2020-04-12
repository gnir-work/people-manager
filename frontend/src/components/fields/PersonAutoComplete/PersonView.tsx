import { Person } from "../../../types/person";
import React, { MouseEvent } from "react";

import "./PersonView.scss";

interface PersonViewProps {
  person: Person;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const PersonView: React.FC<PersonViewProps> = ({
  person,
  onClick = () => {}
}) => (
  <div className="person-field clickable" onClick={onClick}>
    <span className="person-name">{person.fullName}</span>
    <span className="person-id">{person.personalId}</span>
  </div>
);

export default PersonView;
