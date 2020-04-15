import React, { useContext, useState } from "react";
import { Modal, Spin, Alert } from "antd";
import JsonEditor from "../editors/JsonEditor";
import { SiteSettingsContext } from "../../contexts/SiteSettingsContext";

import "./SettingsEditorModal.scss";

const SettingsEditorModal = () => {
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(true);
  const { dynamicSettings, loading } = useContext(SiteSettingsContext);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleError = (hasError: boolean) => {
    setError(hasError);
  };

  return (
    <>
      <Modal
        onCancel={toggleVisible}
        closable
        visible={visible}
        title="עריכת הגדרות"
        okText="שמירה"
        cancelText="ביטול"
        okButtonProps={{ disabled: error }}
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
              onChange={console.log}
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
