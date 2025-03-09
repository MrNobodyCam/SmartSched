import AlertButton from "./AlertButton";
import CrossStatus from "../../assets/icons/cross-status.svg";
import { ReactNode } from "react";

const ErrorAlert = ({
  onClose,
  toastNotify,
  onConfirm,
  title,
  message,
}: {
  onConfirm: () => void;
  toastNotify?: () => ReactNode;
  title: string;
  onClose?: () => void;
  message: string;
}) => {
  return (
    <>
      <AlertButton
        onClose={onClose}
        statusImage={CrossStatus}
        title={title}
        message={message}
        confirmBtnBackground="#EB5757"
        isError={true}
        toastNotify={toastNotify}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default ErrorAlert;
