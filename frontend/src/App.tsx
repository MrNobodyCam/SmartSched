import SecondaryBtn from "./components/SecondaryBtn";
import PrimaryBtn from "./components/PrimaryBtn";

function App() {
  return (
    <>
      <div>
        <PrimaryBtn extraContent={<span>🔥</span>}>Sign Up</PrimaryBtn>
        <br />
        <SecondaryBtn extraContent={<span>🔥</span>}>Sign In</SecondaryBtn>
      </div>
    </>
  );
}

export default App;
