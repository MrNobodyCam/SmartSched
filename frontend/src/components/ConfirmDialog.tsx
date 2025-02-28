import PrimaryBtn from "./PrimaryBtn";
import CrossIcon from "../assets/icons/cross-icon.svg";
import SecondaryBtn from "./SecondaryBtn";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  statusImage: string;
  title: string;
  message: string;
  confirmBtnColor?: string;
  confirmBtnBackground?: string;
}

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  statusImage,
  title,
  message,
  confirmBtnColor,
  confirmBtnBackground,
}: ConfirmDialogProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-[12px] text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <img src={CrossIcon} alt="cross icon" />
        </button>
        <div className="text-center">
          <img className="mx-auto w-16 md:w-18" src={statusImage} alt="status image" />
          <div className="mx-auto my-4 w-48 space-y-1">
            <h3 className="text-lg font-black text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mb-6 text-center">{message}</p>
          </div>
          <div className="flex gap-4">
            <SecondaryBtn
              children="Cancel"
              extraContent={
                <span>
                  <img src={CrossIcon} alt="Cross Icon" />
                </span>
              }
              borderColor="#A5A5A5"
              color="#A5A5A5"
              onClick={onClose}
            />
            <PrimaryBtn
              children="Confirm"
              background={confirmBtnBackground}
              color={confirmBtnColor}
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
