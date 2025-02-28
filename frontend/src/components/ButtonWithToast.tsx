import { useState } from "react";
import ToastNotification from "./ToastNotification"; // Import your toast component
import PrimaryBtn from "./PrimaryBtn";

type Props = {
  children: string;
  message?: "success" | "error" | "warning";
  duratiion?: number;
  color?: string;
  background?: string;
  extraContent?: React.ReactNode;
  onClick?: () => void;
};

const ButtonWithToast = ({ children, message, duratiion, color, background, extraContent, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  function openToast() {
    setIsOpen(true);
  }

  function closeToast() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <ToastNotification
          message={message}
          onClose={closeToast}
          duration={duratiion}
          open={isOpen}
        />
      )}
      <PrimaryBtn  children={children} onClick={() => {openToast(); onClick&&onClick()}} color={color} background={background} extraContent={extraContent} />
    </>
  );
};

export default ButtonWithToast;
