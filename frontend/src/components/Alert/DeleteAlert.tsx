import AlertButton from "./AlertButton";
import TrashIcon from "../../assets/icons/trash-icon.svg";
import { ReactNode } from "react";

const DeleteAlert = ({
  onClose,
  toastNotify,
  onConfirm,
  title,
  message,
}: {
  onConfirm: () => void;
  toastNotify?: () => ReactNode;
  title: string;
  onClose: () => void;
  message: string;
}) => {
  return (
    <>
      <AlertButton
        onClose={onClose}
        statusImage={TrashIcon}
        title={title}
        message={message}
        confirmBtnBackground="#EB5757"
        toastNotify={toastNotify}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default DeleteAlert;
