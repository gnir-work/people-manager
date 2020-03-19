import React, { useRef } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./AddButton.scss";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButton = () => {
    /**
     * We want to un focus the button once it was clicked in order
     * to prevent accidental clicks when we press Enter for example.
     */
    if (buttonRef && buttonRef.current) {
      buttonRef.current.blur();
    }
    onClick();
  };

  return (
    /**
     * This is a plain button and not Antd's Button because
     * we need a way to blur the button once clicked.
     */
    <button
      ref={buttonRef}
      onClick={handleButton}
      type="button"
      className="ant-btn add-button ant-btn-primary ant-btn-circle ant-btn-lg"
    >
      <PlusOutlined />
    </button>
  );
};

export default AddButton;
