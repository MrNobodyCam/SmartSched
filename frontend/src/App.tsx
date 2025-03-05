import AlertButton from "./components/Alert/AlertButton";
import TrashIcon from "./assets/icons/trash-icon.svg";
import CrossStatus from "./assets/icons/cross-status.svg";
import SuccessStatus from "./assets/icons/success-status.svg";
import WarningStatus from "./assets/icons/warning-icon.svg";
import "./components/Components-styles/font.css";

// Toastify
import { ToastContainer, toast } from "react-toastify";

// Import toastify css
// import 'react-toastify/dist/ReactToastify.css';

// Toast notify message
const errorNotify = () => {
  toast.error("Error hz very!!!");
};

const successNotify = () => {
  toast.success("Okay anh delete hzhz!");
};

const warningNotify = () => {
  toast.warn("Tong ti 1 anh leng hg pin ng!");
};

const infoNotify = () => {
  toast.info("Kmean s'eii te bach read te!!!");
};

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen space-x-2">
        {/* Something wrong button */}
        <AlertButton
          children="Something Wrong"
          onClick={() => console.log("It's Work")}
          statusImage={CrossStatus}
          title="Something wrong"
          message="We're so sorry this happened Please, check everything"
          background="#EB5757"
          color="#FFFFFF"
          confirmBtnBackground="#EB5757"
          toastNotify={errorNotify}
        />

        <AlertButton
          children="Delete"
          onClick={() => console.log("It's Work")}
          statusImage={TrashIcon}
          title="Are you sure?"
          message="This action cannot be undone"
          background="#FAF9F6"
          color="#EB5757"
          extraContent={
            <span>
              <img src={TrashIcon} alt="Trash Icon" />
            </span>
          }
          confirmBtnBackground="#EB5757"
          toastNotify={successNotify}
        />

        <AlertButton
          children="Warning"
          onClick={() => console.log("It's Work")}
          statusImage={WarningStatus}
          title="This is warning!"
          message="This action cannot be undone"
          background="#F2994A"
          color="#FFFFFF"
          confirmBtnBackground="#F2994A"
          toastNotify={warningNotify}
        />

        <AlertButton
          children="Info"
          onClick={() => console.log("It's Work")}
          statusImage={SuccessStatus}
          title="This is infomation alert"
          message="This action cannot be undone"
          background="#2D9CDB"
          color="#FFFFFF"
          confirmBtnBackground="#2D9CDB"
          toastNotify={infoNotify}
        />

        {/* Toast Message */}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
