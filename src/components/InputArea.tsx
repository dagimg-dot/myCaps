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
    <div className="mt-10 bg-slate-600 bg-opacity-15 p-2 rounded-lg mb-20">
      <Textarea
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-transparent border-0 h-52 text-lg focus:outline-none placeholder:text-slate-300 placeholder:text-opacity-45"
        placeholder="Type something here..."
      />
      <div>
        <div className="text-xs text-slate-300 text-opacity-45">
          {lastAction}
        </div>
        <div className="text-xs text-slate-300 text-opacity-45">
          {capsLockPressed ? "Caps Lock is on" : "Caps Lock is off"}
        </div>
      </div>
    </div>
  );
}

export default InputArea;
