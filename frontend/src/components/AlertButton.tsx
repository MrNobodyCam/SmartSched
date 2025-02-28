import { useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import PrimaryBtn from "./PrimaryBtn";
import TestToast from "./TestToast";

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
}: Props) {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<any>(null);

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
      />

      <TestToast ref={toastRef} />
    </>
  );
}

export default AlertButton;

//modify this button to handle warning and error
