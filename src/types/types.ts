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
  SelectLetterRight = "Select Letter Right",
  SelectLetterLeft = "Select Letter Left",
  DeleteWordRight = "Delete Word Right",
  DeleteWordLeft = "Delete Word Left",
  SelectWordRight = "Select Word Right",
  SelectWordLeft = "Select Word Left",
}

export interface GlobalState {
  lastAction: string;
  direction: MovingDirection;
  updateLastAction: (action: RemapAction) => void;
}

export interface PerformRemapActionArgs {
  action: RemapAction;
  textareaRef: HTMLTextAreaElement;
  setTextWithCursorPosition: (text: string, cursorPosition: number) => void;
}

export const SUPPORTED_MODIFIERS = ["capslock", "e", "shift"];

export type MovingDirection = "left" | "right" | null;
