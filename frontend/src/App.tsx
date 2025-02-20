import SecondaryBtn from "./components/SecondayBtn";
import PrimaryBtn from "./components/PrimaryBtn";
import NotificationPopup from "./components/NotificationPopup";

function App() {
  return (
    <>
      <div>
        <PrimaryBtn color="" background="">
          Sign Up
        </PrimaryBtn>
        <br />
        <SecondaryBtn color="" border="">
          Sign In
        </SecondaryBtn>
      </div>
      <br />
      <NotificationPopup />
    </>
  );
}

export default App;
