import { useState, useCallback, useEffect } from "react";
import { performRemapAction, getRemapAction } from "@/core/remap";
import useGlobalStore from "@/store";

export function useRemap(textareaRef: React.RefObject<HTMLTextAreaElement>) {
  const [capsLockPressed, setCapsLockPressed] = useState(false);
  const { updateLastAction } = useGlobalStore();
  const [text, setText] = useState("");
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const setTextWithCursorPosition = useCallback(
    (text: string, cursorPosition: number) => {
      setText(text);
      setCursorPosition(cursorPosition);
    },
    [setText, setCursorPosition]
  );

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
          performRemapAction(
            action,
            textareaRef.current,
            setTextWithCursorPosition,
            setText
          );
          updateLastAction(action);
        }
      }
    },
    [capsLockPressed, textareaRef, setTextWithCursorPosition, updateLastAction]
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

      if (cursorPosition !== null) {
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }

      return () => {
        textarea.removeEventListener("keydown", handleKeyDown);
        textarea.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [handleKeyDown, handleKeyUp, textareaRef, cursorPosition]);

  return {
    text,
    setText,
    setTextWithCursorPosition,
    capsLockPressed,
  };
}
