import React, { useContext } from "react";
import _ from "lodash";
import { Person } from "../../types/person";
import { SelectValue } from "antd/lib/select";
import { PeopleContext } from "../../contexts/PeopleContext";
import { arrayFilterByField } from "../../utils/filters";
import FlagList from "../FlagList";
import { megamut, megamutToColor } from "../../consts";

interface MegamutProps {
  person: Person;
}

const Megamut: React.FC<MegamutProps> = ({ person }) => {
  const { updatePerson } = useContext(PeopleContext);
  let dataSet = megamut.filter(megama => !person.megamut.includes(megama));

  /**
   * Add the new megama to the current person
   * @param value
   */
  const addNewMegama = (value: SelectValue) => {
    const newMegama = value.toString();
    const newPerson = {
      ...person,
      megamut: [...person.megamut, newMegama]
    };
    updatePerson(newPerson);
  };

  /**
   * Delete the megama from the current person.
   * @param megamaToDelete
   */
  const deleteMegama = (megamaToDelete: string) => {
    const newPerson = {
      ...person,
      megamut: person.megamut.filter(megama => megama !== megamaToDelete)
    };
    updatePerson(newPerson);
  };

  return (
    <FlagList
      flags={person.megamut}
      colors={megamutToColor}
      dataSet={dataSet}
      onFlagCreation={addNewMegama}
      onFlagDelete={deleteMegama}
      additionText="הוספת מגמה"
    />
  );
};

export default Megamut;
