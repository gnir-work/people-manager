import React, { useContext, useState } from "react";
import { Modal, Spin, Alert, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import JsonEditor from "../editors/JsonEditor";
import classNames from "classnames";
import { SiteSettingsContext } from "../../contexts/SiteSettingsContext";

import "./SettingsEditorModal.scss";
import { DynamicSettings } from "../../types/settings";

interface SettingsEditorModal {
  className?: string;
}

const SettingsEditorModal: React.FC<SettingsEditorModal> = ({ className }) => {
  const {
    dynamicSettings,
    loading,
    updateDynamicSettings,
    staticSettings
  } = useContext(SiteSettingsContext);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [newSettings, setNewSettings] = useState(dynamicSettings);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleError = (hasError: boolean) => {
    if (hasError) {
      setError("אל תשנו את המפתחות או את סוגי השדות!");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    updateDynamicSettings(newSettings)
      .then(() => {
        toggleVisible();
        message.success("הגדרות נשמרו בהצלחה");
      })
      .catch(() => {
        message.error("היית שגיאה");
      });
  };

  const handleCancel = () => {
    setNewSettings(dynamicSettings);
    toggleVisible();
  };

  const handleOnChange = (newSettings: DynamicSettings) => {
    setNewSettings(newSettings);
    if (!newSettings.possibleCourses.includes(newSettings.currentCourse)) {
      setError("הקורס הנוכחי חייב להיות אחד מהקורסים האפשריים");
    } else if (
      !staticSettings.possiblePhases.includes(newSettings.currentPhase)
    ) {
      setError("התקופה חייבת להיות אחת מהתקופות האפשריות!");
    } else {
      setError("");
    }
  };

  return (
    <>
      <Modal
        onCancel={handleCancel}
        closable
        visible={visible}
        title="עריכת הגדרות"
        okText="שמירה"
        cancelText="ביטול"
        okButtonProps={{ disabled: !!error }}
        onOk={handleSubmit}
      >
        <Spin spinning={loading}>
          {error && (
            <Alert
              showIcon
              className="error-message"
              type="error"
              message={error}
            />
          )}
          {!loading && (
            <JsonEditor
              onError={handleError}
              value={dynamicSettings}
              onChange={handleOnChange as any}
            />
          )}
        </Spin>
      </Modal>
      <span
        className={classNames("clickable", className)}
        onClick={toggleVisible}
      >
        <FontAwesomeIcon className="settings-icon" icon={faCogs} /> הגדרות האתר{" "}
      </span>
    </>
  );
};

export default SettingsEditorModal;
