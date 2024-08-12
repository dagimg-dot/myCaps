import clipboard from "@/core/clipboard";
import { PerformRemapActionArgs } from "@/types/types";

const MoveDirection = {
  left: -1,
  right: 1,
} as const;

const DeleteDirection = {
  left: { startOffset: -1, endOffset: 0 },
  right: { startOffset: 0, endOffset: 1 },
} as const;

type MoveDirectionType = keyof typeof MoveDirection;
type DeleteDirectionType = keyof typeof DeleteDirection;

class TextEditor {
  private value: string;
  private selectionStart: number;
  private selectionEnd: number;
  private textArea: HTMLTextAreaElement;
  private setTextWithCursorPosition: (
    text: string,
    cursorPosition: number
  ) => void;

  constructor(args: PerformRemapActionArgs) {
    this.textArea = args.textareaRef;
    this.value = args.textareaRef.value;
    this.selectionStart = args.textareaRef.selectionStart;
    this.selectionEnd = args.textareaRef.selectionEnd;
    this.setTextWithCursorPosition = args.setTextWithCursorPosition;
  }

  selectAll() {
    this.textArea.select();
  }

  cut() {
    clipboard.copy(this.value);
    document.execCommand("cut");
  }

  copy() {
    clipboard.copy(this.value);
  }

  paste() {
    if (!clipboard.paste()) {
      return;
    }
    const newText =
      this.value.slice(0, this.selectionStart) +
      clipboard.paste() +
      this.value.slice(this.selectionEnd);
    this.setTextWithCursorPosition(
      newText,
      this.selectionStart + clipboard.paste()!.length
    );
  }

  moveHorizontal(direction: MoveDirectionType) {
    this.textArea.setSelectionRange(
      this.selectionStart + MoveDirection[direction],
      this.selectionStart + MoveDirection[direction]
    );
  }

  deleteLetter(direction: DeleteDirectionType) {
    const { startOffset, endOffset } = DeleteDirection[direction];
    this.setTextWithCursorPosition(
      this.value.slice(0, this.selectionStart + startOffset) +
        this.value.slice(this.selectionEnd + endOffset),
      this.selectionStart + startOffset
    );
  }
}

export default TextEditor;
