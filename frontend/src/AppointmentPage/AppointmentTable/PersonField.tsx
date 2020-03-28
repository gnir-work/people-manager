import React from "react";
import { Person } from "../../types/person";

import "./PersonField.scss";

interface PersonFieldProps {
  person: Person;
}

const PersonField: React.FC<PersonFieldProps> = ({ person }) => (
  <div className="person-field">
    <span className="person-name">{person.fullName}</span>
    <span className="person-id">{person.personalId}</span>
  </div>
);

export default PersonField;
