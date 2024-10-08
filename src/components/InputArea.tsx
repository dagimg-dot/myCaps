import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import { useRemap } from "@/hooks/useRemap";

function InputArea() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { text, setText } = useRemap(textAreaRef);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  return (
    <div className="mt-0 bg-slate-600 bg-opacity-15 p-2 rounded-lg mb-10">
      <Textarea
        ref={textAreaRef}
        value={text.toLowerCase()}
        onChange={(e) => setText(e.target.value)}
        className="bg-transparent border-0 h-36 text-lg focus:outline-none placeholder:text-slate-300 placeholder:text-opacity-45"
        placeholder="Type something here..."
      />
      <div></div>
    </div>
  );
}

export default InputArea;
