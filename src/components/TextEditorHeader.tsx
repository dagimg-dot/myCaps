import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const TextEditorHeader = () => {
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);
  const [ctrl, setCtrl] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "CapsLock") setCapsLock(true);
      if (e.shiftKey) setShift(true);
      if (e.ctrlKey) setCtrl(true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "CapsLock") setCapsLock(false);
      if (!e.shiftKey) setShift(false);
      if (!e.ctrlKey) setCtrl(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const getButtonStyle = (isPressed: boolean) => {
    return isPressed
      ? "bg-slate-300 text-gray-900 border-transparent"
      : "bg-transparent text-slate-300 border-slate-300 border-2";
  };

  return (
    <div className="flex space-x-4 justify-between md:justify-center lg:justify-center">
      <Button
        variant="outline"
        className={`${getButtonStyle(
          capsLock
        )} transition-colors duration-200 w-32`}
      >
        Caps Lock
      </Button>
      <Button
        variant="outline"
        className={`${getButtonStyle(
          shift
        )} transition-colors duration-200 w-32`}
      >
        Shift
      </Button>
      <Button
        variant="outline"
        className={`${getButtonStyle(
          ctrl
        )} transition-colors duration-200 w-32`}
      >
        Ctrl
      </Button>
    </div>
  );
};

export default TextEditorHeader;
