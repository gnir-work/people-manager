import React, { useEffect, useState, createContext } from "react";
import { getSettings } from "../api/people_settings";
import SiteSettings from "../types/settings";
import { STATIC_SETTINGS } from "../consts";

export interface SiteSettingsContextInterface {
  settings: SiteSettings;
}

const defaultData: SiteSettingsContextInterface = {
  settings: {
    ...STATIC_SETTINGS,
    possibleSubjects: [],
    possibleTracks: [],
    possiblePreferences: [],
    possibleAppointmentReasons: []
  }
};

export const SiteSettingsContext = createContext(defaultData);

/**
 * A context which handles all of the settings regarding the people dataset.
 * for example all of the possible values for the various fields like preferences, subjects will sit here.
 */
export const SiteSettingsContextProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState(defaultData.settings);

  useEffect(() => {
    getSettings().then(({ settings: dynamicSettings }) => {
      setSettings({ ...settings, ...dynamicSettings });
    });
    // This should happen only one time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SiteSettingsContext.Provider
      value={{
        settings
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};
