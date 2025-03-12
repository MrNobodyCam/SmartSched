import AlertButton from "./AlertButton";
import WarningStatus from "../../assets/icons/warning-icon.svg";
import { ReactNode } from "react";

const WarningAlert = ({
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
        statusImage={WarningStatus}
        title={title}
        message={message}
        confirmBtnBackground="#F2994A"
        toastNotify={toastNotify}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default WarningAlert;
