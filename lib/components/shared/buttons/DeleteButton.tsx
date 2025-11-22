import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Popconfirm } from "antd";
import { PopconfirmProps } from "antd/es/popconfirm";

type DeleteButtonProps = {
  popConfirmTitle?: PopconfirmProps["title"];
  popConfirmDescription?: PopconfirmProps["description"];
  placement?: PopconfirmProps["placement"];
  onConfirm?: PopconfirmProps["onConfirm"];
};

export const DeleteButton = ({
  popConfirmTitle,
  popConfirmDescription,
  placement,
  onConfirm,
}: DeleteButtonProps) => (
  <Popconfirm
    title={popConfirmTitle}
    description={popConfirmDescription}
    okText="Oui"
    cancelText="Non"
    placement={placement}
    onConfirm={onConfirm}
  >
    <div className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer">
      <FontAwesomeIcon icon={faTrash} />
    </div>
  </Popconfirm>
);
