import React from "react";
import { Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon className="delete-icon" icon={faTrash} />
    </Popconfirm>
  );
};

export default DeleteButton;
