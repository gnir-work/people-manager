import React, { useContext, useState } from "react";
import { Modal, Spin, Alert, message } from "antd";
import JsonEditor from "../editors/JsonEditor";
import { SiteSettingsContext } from "../../contexts/SiteSettingsContext";

import "./SettingsEditorModal.scss";

const SettingsEditorModal = () => {
  const { dynamicSettings, loading, updateDynamicSettings } = useContext(
    SiteSettingsContext
  );

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [newSettings, setNewSettings] = useState(dynamicSettings);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleError = (hasError: boolean) => {
    setError(hasError);
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
        okButtonProps={{ disabled: error }}
        onOk={handleSubmit}
      >
        <Spin spinning={loading}>
          {error && (
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
      <span className="clickable" onClick={toggleVisible}>
        {" "}
        הגדרות האתר{" "}
      </span>
    </>
  );
};

export default SettingsEditorModal;
