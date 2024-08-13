export enum RemapAction {
  SelectAll = "Select All",
  Cut = "Cut",
  Copy = "Copy",
  Paste = "Paste",
  MoveLeft = "Move Left",
  MoveDown = "Move Down",
  MoveRight = "Move Right",
  MoveUp = "Move Up",
  MoveStartLine = "Move Start Line",
  MoveEndLine = "Move End Line",
  Backspace = "Backspace",
  Delete = "Delete",
  MoveRightWord = "Move Right Word",
  MoveLeftWord = "Move Left Word",
  Undo = "Undo",
  Redo = "Redo",
}

export interface GlobalState {
  lastAction: string;
  updateLastAction: (action: RemapAction) => void;
}

export interface PerformRemapActionArgs {
  action: RemapAction;
  textareaRef: HTMLTextAreaElement;
  setTextWithCursorPosition: (text: string, cursorPosition: number) => void;
  setText: (text: string) => void;
}

export const SUPPORTED_MODIFIERS = ["capslock", "e", "shift"];
