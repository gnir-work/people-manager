import React, { useEffect, useState, createContext } from "react";
import { getSettings } from "../api/people_settings";
import SiteSettings, {
  StaticSettings,
  DynamicSettings
} from "../types/settings";
import { STATIC_SETTINGS } from "../consts";

export interface SiteSettingsContextInterface {
  settings: SiteSettings;
  staticSettings: StaticSettings;
  dynamicSettings: DynamicSettings;
  loading: boolean;
}

const defaultDynamicSettings = {
  possibleSubjects: [],
  possibleTracks: [],
  possiblePreferences: [],
  possibleAppointmentReasons: []
};

const defaultData: SiteSettingsContextInterface = {
  settings: {
    ...STATIC_SETTINGS,
    ...defaultDynamicSettings
  },
  staticSettings: STATIC_SETTINGS,
  dynamicSettings: defaultDynamicSettings,
  loading: false
};

export const SiteSettingsContext = createContext(defaultData);

/**
 * A context which handles all of the settings regarding the people dataset.
 * for example all of the possible values for the various fields like preferences, subjects will sit here.
 */
export const SiteSettingsContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [dynamicSettings, setDynamicSettings] = useState(
    defaultData.dynamicSettings
  );

  useEffect(() => {
    getSettings().then(({ settings: dynamicSettings }) => {
      setDynamicSettings(dynamicSettings);
      setLoading(false);
    });
    // This should happen only one time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SiteSettingsContext.Provider
      value={{
        settings: { ...STATIC_SETTINGS, ...dynamicSettings },
        staticSettings: STATIC_SETTINGS,
        dynamicSettings,
        loading
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};
