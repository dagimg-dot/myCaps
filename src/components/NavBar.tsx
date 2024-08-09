import { CapsLockOff, CapsLockOn, GitHub } from "@/icons";
import { useEffect, useState } from "react";

function NavBar() {
  const [capsLockPressed, setCapsLockPressed] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "CapsLock") {
        setCapsLockPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "CapsLock") {
        setCapsLockPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="sticky md:absolute lg:absolute z-10 top-5 left-5 right-5 flex justify-between items-center h-16 px-5 text-white rounded-lg bg-opacity-30 bg-stone-800 backdrop-filter backdrop-blur-lg border-slate-300 border-2"> 
      <div
        data-tooltip-id="tooltip"
        data-tooltip-content={
          capsLockPressed ? "CapsLock is Pressed" : "CapsLock is not Pressed"
        }
      >
        {capsLockPressed ? <CapsLockOn /> : <CapsLockOff />}
      </div>
      <span className="font-bold text-sm md:text-xl">
        MyCaps - CapsLock Emulator
      </span>
      <div
        data-tooltip-id="tooltip"
        data-tooltip-content="GitHub Repository Link"
      >
        <a href="https://github.com/dagimg-dot/myCaps" target="_blank">
          <GitHub />
        </a>
      </div>
    </div>
  );
}

export default NavBar;
