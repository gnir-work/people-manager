import React from "react";
import { Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";

import "./DeleteButton.scss";

interface DeleteButton {
  onDelete: () => void;
  confirmationMessage: string;
}

/**
 * A general delete button.
 */
const DeleteButton: React.FC<DeleteButton> = ({
  onDelete,
  confirmationMessage
}) => {
  return (
    <Popconfirm
      title={confirmationMessage}
      onConfirm={onDelete}
      okText="כן"
      cancelText="לא"
      placement="right"
    >
      <DeleteFilled />
    </Popconfirm>
  );
};

export default DeleteButton;
