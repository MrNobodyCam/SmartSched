import ConfirmDialog from "./ConfirmDialog";

type Props = {
  onClose?: () => void;
  isError?: boolean;
  statusImage: string;
  title: string;
  message: string;
  confirmBtnColor?: string;
  confirmBtnBackground?: string;
  onConfirm: () => void;
  toastNotify?: () => void;
};

function AlertButton({
  onClose,
  isError,
  onConfirm,
  statusImage,
  title,
  message,
  confirmBtnColor = "#ffffff",
  confirmBtnBackground = "#2D9CDB",
  toastNotify,
}: Props) {
  return (
    <>
      <ConfirmDialog
        onClose={onClose}
        onConfirm={onConfirm}
        isError={isError}
        title={title}
        message={message}
        statusImage={statusImage}
        confirmBtnColor={confirmBtnColor}
        confirmBtnBackground={confirmBtnBackground}
        toastNotify={toastNotify}
      />
    </>
  );
}

export default AlertButton;
