import PrimaryBtn from "../PrimaryBtn";
import CrossIcon from "../../assets/icons/cross-icon.svg";
import SecondaryBtn from "../SecondaryBtn";

interface ConfirmDialogProps {
  onClose?: () => void;
  onConfirm: () => void;
  statusImage: string;
  isError?: boolean;
  title: string;
  message: string;
  confirmBtnColor?: string;
  confirmBtnBackground?: string;
  toastNotify?: () => void;
}

function ConfirmDialog({
  isError = false,
  onClose,
  onConfirm,
  statusImage,
  title,
  message,
  confirmBtnColor,
  confirmBtnBackground,
  toastNotify,
}: ConfirmDialogProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center transition-colors z-100`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        className={`bg-white rounded-xl shadow p-6 transition-all w-[70%] md:w-[50%] lg:w-[40%]`}
      >
        <div className="text-center">
          <img
            className="mx-auto w-16 md:w-18 lg:w-20"
            src={statusImage}
            alt="status image"
          />
          <div className="mx-auto my-4 w-[80%] space-y-1">
            <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-black text-gray-800">
              {title}
            </h3>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500 mb-6 text-center">
              {message}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            {isError == false && (
              <SecondaryBtn
                children="Close"
                py="py-1"
                extraContent={
                  <span>
                    <img
                      src={CrossIcon}
                      alt="Cross Icon"
                      className="w-[14px] md:w-[16px] lg:w-[18px]"
                    />
                  </span>
                }
                borderColor="#A5A5A5"
                color="#A5A5A5"
                onClick={onClose}
              />
            )}

            <PrimaryBtn
              py="py-1"
              children="Confirm"
              background={confirmBtnBackground}
              color={confirmBtnColor}
              onClick={() => {
                onConfirm();
                toastNotify && toastNotify();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
