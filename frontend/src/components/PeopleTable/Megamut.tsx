import React, { useContext } from "react";
import _ from "lodash";
import { Person } from "../../types/person";
import { Megama } from "../../types/organization";
import { megamaToText } from "../../consts";
import { SelectValue } from "antd/lib/select";
import { PeopleContext } from "../../contexts/PeopleContext";
import { arrayFilterByField } from "../../utils/filters";
import FlagList from "../FlagList";

interface MegamutProps {
  person: Person;
}

const megamaToColor = {
  [Megama.Maarachot]: "orange",
  [Megama.Mehkar]: "blue",
  [Megama.Mekorot]: "green"
};

const Megamut: React.FC<MegamutProps> = ({ person }) => {
  const { updatePerson } = useContext(PeopleContext);
  let dataSet = _.toPairs(megamaToText)
    .filter(
      ([megama, text]) => !arrayFilterByField(person, megama as any, "megamut")
    )
    .map(([megama, text]) => text);

  /**
   * Add the new megama to the current person
   * @param value
   */
  const addNewMegama = (value: SelectValue) => {
    const newMegama = _.invert(megamaToText)[value.toString()];
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
  const deleteMegama = (megamaToDelete: Megama) => {
    const newPerson = {
      ...person,
      megamut: person.megamut.filter(megama => megama !== megamaToDelete)
    };
    updatePerson(newPerson);
  };

  return (
    <FlagList
      flags={person.megamut}
      dataSet={dataSet}
      colorMapping={megamaToColor}
      textMapping={megamaToText}
      onFlagCreation={addNewMegama}
      onFlagDelete={deleteMegama}
      additionText="הוספת מגמה"
    />
  );
};

export default Megamut;
