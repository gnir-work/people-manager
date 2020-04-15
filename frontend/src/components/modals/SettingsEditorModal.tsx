import React, { useContext, useState } from "react";
import { Modal, Spin, Alert, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import JsonEditor from "../editors/JsonEditor";
import classNames from "classnames";
import { SiteSettingsContext } from "../../contexts/SiteSettingsContext";

import "./SettingsEditorModal.scss";

interface SettingsEditorModal {
  className?: string;
}

const SettingsEditorModal: React.FC<SettingsEditorModal> = ({ className }) => {
  const { dynamicSettings, loading, updateDynamicSettings } = useContext(
    SiteSettingsContext
  );

  const [visible, setVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [newSettings, setNewSettings] = useState(dynamicSettings);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleError = (hasError: boolean) => {
    setHasError(hasError);
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

  const handleOnChange = (newSettings: any) => {
    setNewSettings(newSettings);
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
        okButtonProps={{ disabled: hasError }}
        onOk={handleSubmit}
      >
        <Spin spinning={loading}>
          {hasError && (
            <Alert
              showIcon
              className="error-message"
              type="error"
              message="אל תשנו את המפתחות או את סוגי השדות!"
            />
          )}
          {!loading && (
            <JsonEditor
              onError={handleError}
              value={dynamicSettings}
              onChange={handleOnChange}
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
