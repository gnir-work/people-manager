import React, { useEffect, useState, createContext } from "react";
import { getSettings } from "../api/people_settings";

export interface PeopleSettingsContextInterface {
  settings: {
    possibleSubjects: string[];
    possibleTracks: string[];
    possiblePreferences: string[];
    possibleStatuses: string[];
    possibleAvailabilities: string[];
    possibleAppointmentReasons: string[];
    possibleEntryStates: string[];
    possibleBedStatus: string[];
    possiblePhases: string[];
  };
}

const defaultData: PeopleSettingsContextInterface = {
  settings: {
    possibleAvailabilities: [],
    possiblePreferences: [],
    possibleStatuses: [],
    possibleSubjects: [],
    possibleTracks: [],
    possibleAppointmentReasons: [],
    possibleEntryStates: [],
    possibleBedStatus: [],
    possiblePhases: []
  }
};

export const PeopleSettingsContext = createContext(defaultData);

/**
 * A context which handles all of the settings regarding the people dataset.
 * for example all of the possible values for the various fields like preferences, subjects will sit here.
 */
export const PeopleSettingsContextProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState(defaultData.settings);

  useEffect(() => {
    getSettings().then(newSettings => {
      setSettings(newSettings.settings);
    });
  }, []);

  return (
    <PeopleSettingsContext.Provider
      value={{
        settings
      }}
    >
      {children}
    </PeopleSettingsContext.Provider>
  );
};
