// import CapsLockEmulator from "@/components/CapsLockEmulator";
import Home from "@/pages/Home";
import NavBar from "@/components/NavBar";
import Doc from "@/components/Doc";
import TextEditor from "@/components/TextEditor";
import { Tooltip } from "react-tooltip";

function App() {
  return (
    <>
      <Home>
        {/* <CapsLockEmulator /> */}
        <NavBar />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-5 md:pt-20 lg:pt-20 pb-5 lg:h-screen">
          <Doc />
          <TextEditor />
        </div>
      </Home>
      <Tooltip id="tooltip" />
    </>
  );
}

export default App;
