import { useState, useCallback, useEffect } from "react";
import { performRemapAction, getRemapAction, RemapAction } from "@/core/remap";

export function useRemap(textareaRef: React.RefObject<HTMLTextAreaElement>) {
  const [capsLockPressed, setCapsLockPressed] = useState(false);
  const [lastAction, setLastAction] = useState<RemapAction | null>(null);
  const [text, setText] = useState("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "CapsLock") {
        e.preventDefault();
        setCapsLockPressed(true);
      }

      if (capsLockPressed && textareaRef.current) {
        e.preventDefault();
        const action = getRemapAction(e.key);
        if (action) {
          performRemapAction(action, textareaRef.current, setText);
          setLastAction(action);
        }
      }
    },
    [capsLockPressed, textareaRef]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "CapsLock") {
      setCapsLockPressed(false);
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
      textarea.addEventListener("keyup", handleKeyUp);
      return () => {
        textarea.removeEventListener("keydown", handleKeyDown);
        textarea.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [handleKeyDown, handleKeyUp, textareaRef]);

  return { text, setText, capsLockPressed, lastAction };
}
