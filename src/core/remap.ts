export type RemapAction =
  | "Select All"
  | "Cut"
  | "Copy"
  | "Paste"
  | "Move Left"
  | "Move Down"
  | "Move Right"
  | "Move Up"
  | "Backspace"
  | "Delete"
  | "Undo"
  | "Redo";

const remapActionMap: Record<string, RemapAction> = {
  a: "Select All",
  s: "Cut",
  d: "Copy",
  f: "Paste",
  j: "Move Left",
  k: "Move Down",
  l: "Move Right",
  i: "Move Up",
  n: "Backspace",
  m: "Delete",
  ",": "Undo",
  ".": "Redo",
};

export function performRemapAction(
  action: RemapAction,
  textareaElement: HTMLTextAreaElement,
  setText: (text: string) => void
): void {
  const { selectionStart, selectionEnd, value } = textareaElement;

  switch (action) {
    case "Select All":
      textareaElement.select();
      break;
    case "Cut":
      document.execCommand("cut");
      break;
    case "Copy":
      document.execCommand("copy");
      break;
    case "Paste":
      document.execCommand("paste");
      break;
    case "Move Left":
      textareaElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
      break;
    case "Move Down":
      // eslint-disable-next-line no-case-declarations
      const nextLineStart = value.indexOf("\n", selectionEnd) + 1;
      textareaElement.setSelectionRange(nextLineStart, nextLineStart);
      break;
    case "Move Right":
      textareaElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
      break;
    case "Move Up":
      // eslint-disable-next-line no-case-declarations
      const prevLineEnd = value.lastIndexOf("\n", selectionStart - 1);
      textareaElement.setSelectionRange(prevLineEnd + 1, prevLineEnd + 1);
      break;
    case "Backspace":
      setText(value.slice(0, selectionStart - 1) + value.slice(selectionEnd));
      textareaElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
      break;
    case "Delete":
      setText(value.slice(0, selectionStart) + value.slice(selectionEnd + 1));
      textareaElement.setSelectionRange(selectionStart, selectionStart);
      break;
    case "Undo":
      document.execCommand("undo");
      break;
    case "Redo":
      document.execCommand("redo");
      break;
  }
}

export function getRemapAction(key: string): RemapAction | null {
  return remapActionMap[key.toLowerCase()] || null;
}
