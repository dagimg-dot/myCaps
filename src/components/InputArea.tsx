import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import { useRemap } from "@/hooks/useRemap";

function InputArea() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { text, setText, capsLockPressed, lastAction } = useRemap(textAreaRef);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  return (
    <div className="mt-10 bg-slate-600 bg-opacity-15 p-2 rounded-lg">
      <Textarea
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-transparent border-0 h-52 text-lg focus:outline-none placeholder:text-slate-300 placeholder:text-opacity-45"
        placeholder="Type something here..."
      />
      <div className="mt-2 text-sm text-slate-300">
        <p>CapsLock: {capsLockPressed ? "Pressed" : "Not Pressed"}</p>
        <p>Last Action: {lastAction || "None"}</p>
      </div>
    </div>
  );
}

export default InputArea;
