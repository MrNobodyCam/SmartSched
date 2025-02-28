import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import PrimaryBtn from "./PrimaryBtn";

type Props = {
  id?: string;
  onClick: (id?: string) => void;
  children: string;
  color?: string;
  background?: string;
  extraContent?: React.ReactNode;
  statusImage: string;
  title: string;
  message: string;
  confirmBtnColor?: string;
  confirmBtnBackground?: string;
  toastNotify?: () => void;
};

function AlertButton({
  id,
  onClick,
  children,
  color,
  background,
  extraContent,
  statusImage,
  title,
  message,
  confirmBtnColor = "#ffffff",
  confirmBtnBackground = "#2D9CDB",
  toastNotify,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onClick(id);
    setOpen(false);
  };

  return (
    <>
      {/* Button */}
      <PrimaryBtn
        children={children}
        onClick={() => setOpen(true)}
        background={background}
        color={color}
        extraContent={extraContent}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
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