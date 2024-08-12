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
