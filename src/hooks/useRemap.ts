import { useState, useCallback, useEffect } from "react";
import { performRemapAction, generateActionKey } from "@/core/remap";
import useGlobalStore from "@/store";
import { SUPPORTED_MODIFIERS } from "@/types/types";

export function useRemap(textareaRef: React.RefObject<HTMLTextAreaElement>) {
  const [keyState, setKeyState] = useState(new Map<string, boolean>());
  const { updateLastAction, updateDirection, direction } = useGlobalStore();
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
      const key = e.key.toLowerCase();
      if (SUPPORTED_MODIFIERS.includes(key)) {
        setKeyState((prev) => new Map(prev).set(key, true));
      }

      if (keyState.get("capslock") && textareaRef.current) {
        e.preventDefault();

        const action = generateActionKey(keyState, key);
        if (action) {
          performRemapAction({
            action: action,
            textareaRef: textareaRef.current,
            setTextWithCursorPosition,
            setText,
            updateDirection,
            direction,
          });
          updateLastAction(action);
        }
      }
    },
    [
      keyState,
      textareaRef,
      setTextWithCursorPosition,
      updateLastAction,
      updateDirection,
      direction,
    ]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (SUPPORTED_MODIFIERS.includes(key)) {
      setKeyState((prev) => new Map(prev).set(key, false));
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("keydown", handleKeyDown);
      textarea.addEventListener("keyup", handleKeyUp);

      if (cursorPosition !== null && window.getSelection()?.toString() === "") {
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }

      return () => {
        textarea.removeEventListener("keydown", handleKeyDown);
        textarea.removeEventListener("keyup", handleKeyUp);
        setCursorPosition(null);
      };
    }
  }, [handleKeyDown, handleKeyUp, textareaRef, cursorPosition, setText]);

  return {
    text,
    setText,
  };
}
