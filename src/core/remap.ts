import clipboard from "@/core/clipboard";

export enum RemapAction {
  SelectAll = "Select All",
  Cut = "Cut",
  Copy = "Copy",
  Paste = "Paste",
  MoveLeft = "Move Left",
  MoveDown = "Move Down",
  MoveRight = "Move Right",
  MoveUp = "Move Up",
  Backspace = "Backspace",
  Delete = "Delete",
  Undo = "Undo",
  Redo = "Redo",
}

const remapActionMap: Record<string, RemapAction> = {
  a: RemapAction.SelectAll,
  s: RemapAction.Cut,
  d: RemapAction.Copy,
  f: RemapAction.Paste,
  j: RemapAction.MoveLeft,
  k: RemapAction.MoveDown,
  l: RemapAction.MoveRight,
  i: RemapAction.MoveUp,
  n: RemapAction.Backspace,
  m: RemapAction.Delete,
  ",": RemapAction.Undo,
  ".": RemapAction.Redo,
};

export function performRemapAction(
  action: RemapAction,
  textareaElement: HTMLTextAreaElement,
  setTextWithCursorPosition: (text: string, cursorPosition: number) => void,
  setText: (text: string) => void
): void {
  const { selectionStart, selectionEnd, value } = textareaElement;

  switch (action) {
    case RemapAction.SelectAll:
      textareaElement.select();
      break;
    case RemapAction.Cut:
      clipboard.copy(value);
      document.execCommand("cut");
      break;
    case RemapAction.Copy:
      clipboard.copy(value);
      break;
    case RemapAction.Paste: {
      if (!clipboard.paste()) {
        console.log("Nothing to paste");
        return;
      }
      const newText =
        value.slice(0, selectionStart) +
        clipboard.paste() +
        value.slice(selectionEnd);
      setTextWithCursorPosition(
        newText,
        selectionStart + clipboard.paste()!.length
      );
      break;
    }
    case RemapAction.MoveLeft:
      textareaElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
      break;
    case RemapAction.MoveDown: {
      const nextLineStart = value.indexOf("\n", selectionEnd) + 1;
      textareaElement.setSelectionRange(nextLineStart, nextLineStart);
      break;
    }
    case RemapAction.MoveRight:
      textareaElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
      break;
    case RemapAction.MoveUp: {
      const prevLineEnd = value.lastIndexOf("\n", selectionStart - 1);
      textareaElement.setSelectionRange(prevLineEnd + 1, prevLineEnd + 1);
      break;
    }
    case RemapAction.Backspace:
      setText(value.slice(0, selectionStart - 1) + value.slice(selectionEnd));
      textareaElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
      break;
    case RemapAction.Delete:
      setText(value.slice(0, selectionStart) + value.slice(selectionEnd + 1));
      textareaElement.setSelectionRange(selectionStart, selectionStart);
      break;
    case RemapAction.Undo:
      document.execCommand("undo");
      break;
    case RemapAction.Redo:
      document.execCommand("redo");
      break;
  }
}

export function getRemapAction(key: string): RemapAction | null {
  return remapActionMap[key.toLowerCase()] || null;
}
