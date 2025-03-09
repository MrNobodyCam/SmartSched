import { useState } from "react";
import ErrorAlert from "./WarningAlert";
import { toast, ToastContainer } from "react-toastify";
function App() {
  const [openError, setOpenError] = useState(false);
  const onOpenError = () => {
    setOpenError(true);
  };
  return (
    <>
      <button
        className="bg-blue-500 rounded-2xl text-white p-3 cursor-pointer"
        onClick={onOpenError}
      >
        Click Error
      </button>
      {openError && (
        <ErrorAlert
          onConfirm={() => setOpenError(false)}
          onClose={() => setOpenError(false)}
          title="Eror"
          message="That is error"
          toastNotify={() => toast.error("Error hz very!!!")}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
