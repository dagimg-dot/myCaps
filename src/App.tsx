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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <Doc />
          <TextEditor />
        </div>
      </Home>
      <Tooltip id="tooltip" />
    </>
  );
}

export default App;
