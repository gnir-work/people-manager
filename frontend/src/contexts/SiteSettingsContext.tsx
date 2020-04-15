import React, { useEffect, useState, createContext } from "react";
import { getSettings, updateSettings } from "../api/settings";
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
  updateDynamicSettings: (newDynamicSettings: DynamicSettings) => Promise<void>;
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
  loading: false,
  updateDynamicSettings: () => new Promise(() => {})
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

  const updateDynamicSettings = (newDynamicSettings: DynamicSettings) => {
    setDynamicSettings(newDynamicSettings);
    return updateSettings(newDynamicSettings).then(() => {
      setDynamicSettings(newDynamicSettings);
    });
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings: { ...STATIC_SETTINGS, ...dynamicSettings },
        staticSettings: STATIC_SETTINGS,
        dynamicSettings,
        updateDynamicSettings,
        loading
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};
