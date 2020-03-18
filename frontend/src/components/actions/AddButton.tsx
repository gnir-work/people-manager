import React from "react";
import { Button, Icon } from "antd";

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
    <Icon type="plus" />
  </Button>
);

export default AddButton;
