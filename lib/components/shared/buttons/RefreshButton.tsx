import {Button, ButtonProps} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";

type RefreshButtonProps = ButtonProps & {
  onClick: () => void;
};
export const RefreshButton = ({ onClick, ...props }: RefreshButtonProps) => (
  <Button
    {...props}
    onClick={onClick}
    className="ml-1"
    size="small"
    shape="round"
    icon={<FontAwesomeIcon icon={faRotateRight} />}
  />
);
