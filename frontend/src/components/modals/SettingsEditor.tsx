import React from "react";
import { Modal } from "antd";
import JsonEditor from "../editors/JsonEditor";

const SettingsEditorModal = () => (
  <Modal visible title="עריכת הגדרות">
    <JsonEditor value={{ test: [123213] }} onChange={console.log} />
  </Modal>
);

export default SettingsEditorModal;
