import React from "react";
import { Checkbox } from "antd";

interface BooleanFieldProps {
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

const BooleanField: React.FC<BooleanFieldProps> = ({ checked, onChange }) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <Checkbox checked={checked} className="clickable" onClick={handleClick} />
  );
};

export default BooleanField;
