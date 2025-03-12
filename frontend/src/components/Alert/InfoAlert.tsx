import AlertButton from "./AlertButton";
import SuccessStatus from "../../assets/icons/success-status.svg";
import { ReactNode } from "react";

const InfoAlert = ({
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
        statusImage={SuccessStatus}
        title={title}
        message={message}
        confirmBtnBackground="#2D9CDB"
        toastNotify={toastNotify}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default InfoAlert;
