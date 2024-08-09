import { useState, useEffect, useRef } from "react";

const KeyCapture = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " ") {
        updateText(" Space ");
      } else if (event.key.length === 1) {
        updateText(" " + event.key + " ");
      } else {
        updateText(" " + event.key.toUpperCase() + " ");
      }
    };

    const updateText = (newChar: string) => {
      setText((prevText) => prevText + newChar);
      setIsTyping(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setText((prevText) => prevText.slice(-40, prevText.length));
      }, 2000);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="bg-slate-600 bg-opacity-15 p-2 rounded-lg w-1/5 h-16 text-2xl overflow-hidden whitespace-nowrap flex items-center justify-start"
      data-tooltip-id="tooltip"
      data-tooltip-content="Key Capture"
    >
      <div
        className={`relative inline-block transition-opacity duration-1000 ${
          isTyping ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="opacity-20">{text.slice(0, -20)}</span>
        <span className="opacity-40">{text.slice(-20, -15)}</span>
        <span className="opacity-60">{text.slice(-15, -10)}</span>
        <span className="opacity-80">{text.slice(-10, -5)}</span>
        <span>{text.slice(-5)}</span>
      </div>
    </div>
  );
};

export default KeyCapture;
