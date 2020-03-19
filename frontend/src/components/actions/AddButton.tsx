import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./AddButton.scss";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <Button
    type="primary"
    shape="circle"
    onClick={onClick}
    size="large"
    className="add-button"
  >
    <PlusOutlined />
  </Button>
);

export default AddButton;
