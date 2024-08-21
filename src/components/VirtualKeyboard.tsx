import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VirtualKeyboardProps {
  onKeyPress: (keys: string[]) => void;
}

const keyMap: Record<string, string> = {
  CapsLock: "capslock",
  Control: "ctrl",
  Delete: "del",
};

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let key = event.key.toLowerCase();

      if (keyMap[event.key]) {
        key = keyMap[event.key];
      }

      setPressedKeys((prevKeys) => {
        return prevKeys.includes(key)
          ? prevKeys.filter((k) => k !== key)
          : [...prevKeys, key];
      });
      onKeyPress([...pressedKeys, key]);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      let key = event.key.toLowerCase();

      if (keyMap[event.key]) {
        key = keyMap[event.key];
      }

      setPressedKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onKeyPress, pressedKeys]);

  const specialKeys = [
    "capslock",
    "e",
    "i",
    "j",
    "k",
    "l",
    "u",
    "o",
    "a",
    "s",
    "d",
    "f",
    "shift",
    ".",
    ",",
  ];

  const keyboardLayout = [
    [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",
    ],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    [
      "CapsLock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "Enter",
    ],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
    ["Ctrl", "🍎", "Alt", " ", "Alt", "Ctrl", "Del"],
  ];

  return (
    <div className="flex flex-col gap-2 w-full max-w-[900px] scale-50  md:scale-75 lg:scale-90">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.map((key, keyIndex) => (
            <Button
              key={`${rowIndex}-${keyIndex}`}
              className={`w-12 h-12 rounded-md hover:bg-purple-300 hover:text-gray-900 ${
                key.length > 1 ? "w-20" : key === " " ? "w-56" : ""
              } ${
                pressedKeys.includes(key.toLowerCase())
                  ? "bg-slate-300 text-gray-900 border-transparent"
                  : specialKeys.includes(key.toLowerCase())
                  ? "bg-transparent text-slate-300 border-blue-500 border-2"
                  : "bg-transparent text-slate-300 border-slate-300 border-2"
              }`}
              onClick={() => onKeyPress([...pressedKeys, key.toLowerCase()])}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
