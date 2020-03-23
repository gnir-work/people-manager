import React, { useEffect, useState, createContext } from "react";
import { getSettings } from "../api/people_settings";

export interface PeopleSettingsContext {
  settings: {
    possibleSubjects: string[];
    possibleTracks: string[];
    possiblePreferences: string[];
    possibleStatuses: string[];
    possibleAvailabilities: string[];
  };
}

const defaultData: PeopleSettingsContext = {
  settings: {
    possibleAvailabilities: [],
    possiblePreferences: [],
    possibleStatuses: [],
    possibleSubjects: [],
    possibleTracks: []
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
