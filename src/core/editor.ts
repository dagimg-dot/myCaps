import clipboard from "@/core/clipboard";
import useGlobalStore from "@/store";
import { MovingDirection, PerformRemapActionArgs } from "@/types/types";

const MoveDirection = {
  left: -1,
  right: 1,
  up: -1,
  down: 1,
} as const;

const DeleteDirection = {
  left: { startOffset: -1, endOffset: 0 },
  right: { startOffset: 0, endOffset: 1 },
} as const;

type MoveDirectionType = keyof typeof MoveDirection;
type DeleteDirectionType = keyof typeof DeleteDirection;

class TextEditor {
  private value: string;
  private direction: MovingDirection;
  private textArea: HTMLTextAreaElement;
  private setTextWithCursorPosition: (
    text: string,
    cursorPosition: number
  ) => void;

  constructor(args: PerformRemapActionArgs) {
    this.textArea = args.textareaRef;
    this.value = args.textareaRef.value;
    this.direction = useGlobalStore.getState().direction;
    this.setTextWithCursorPosition = args.setTextWithCursorPosition;
  }

  get selectionStart() {
    return this.textArea.selectionStart;
  }

  get selectionEnd() {
    return this.textArea.selectionEnd;
  }

  #updateDirection(newdirection: MovingDirection) {
    useGlobalStore.setState({ direction: newdirection });
  }

  #setCursorPosition(position: number) {
    this.textArea.setSelectionRange(position, position);
  }

  selectAll() {
    this.textArea.select();
  }

  // Cut is implemeneted here and not in the clipboard.ts file because
  // it manipulates the textarea value and the cursor position directly
  cut() {
    this.copy();
    this.setTextWithCursorPosition(
      this.value.replace(this.#getSelectedText()!, ""),
      this.selectionStart
    );
  }

  copy() {
    clipboard.copy(this.value);
  }

  paste() {
    this.#setCursorPosition(this.selectionEnd);
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

  #getCurrentLine(lines: string[]) {
    let lineStart = 0;
    let lineNumber = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lineStart + lines[i].length >= this.selectionStart) {
        lineNumber = i;
        break;
      }
      lineStart += lines[i].length + 1;
    }

    return { lineStart, lineNumber };
  }

  #getLines() {
    // Todo: make line generating function more robust to handle
    // non-newline texts (continuous texts)
    return this.value.split("\n");
  }

  moveHorizontal(direction: MoveDirectionType, start = false) {
    if (!start) {
      const selectionStart = Math.max(
        this.selectionStart + MoveDirection[direction],
        0
      );
      this.#setCursorPosition(selectionStart);
      return;
    }

    const lines = this.#getLines();
    const { lineStart: currentLineStart, lineNumber: currentLineNumber } =
      this.#getCurrentLine(lines);
    if (direction == "left") {
      this.#setCursorPosition(currentLineStart);
    } else {
      const currentLineEnd = currentLineStart + lines[currentLineNumber].length;
      this.#setCursorPosition(currentLineEnd);
    }
  }

  moveVertical(direction: MoveDirectionType) {
    const lines = this.#getLines();
    const { lineStart: currentLineStart, lineNumber: currentLineNumber } =
      this.#getCurrentLine(lines);

    const currentLine = lines[currentLineNumber];
    const horizontalPosition = this.selectionStart - currentLineStart;

    const targetLineNumber = currentLineNumber + MoveDirection[direction];

    if (targetLineNumber < 0 || targetLineNumber >= lines.length) {
      return;
    }

    const targetLine = lines[targetLineNumber];
    let targetLineStart = currentLineStart;

    targetLineStart +=
      MoveDirection[direction] *
        (direction === "up" ? targetLine.length : currentLine.length) +
      MoveDirection[direction];

    const newPosition =
      targetLineStart + Math.min(horizontalPosition, targetLine.length);

    this.#setCursorPosition(newPosition);
  }

  private findNextWordPosition(direction: MoveDirectionType): number {
    const isForward = direction === "right";

    const lines = this.#getLines();
    const { lineNumber, lineStart } = this.#getCurrentLine(lines);
    const currentLine = lines[lineNumber];
    const length = currentLine.length;
    const currentPosition = this.selectionStart - lineStart;

    // Handle edge cases
    if (length === 0) return 0;
    if (currentPosition < 0) return 0;
    if (currentPosition > length) return length;

    const isWordChar = (char: string) => /\w/.test(char);

    let pos = currentPosition;

    // Adjust starting position if we're at or beyond the end of the text
    if (pos >= length) {
      pos = length - 1;
    }

    if (!isForward) {
      // Moving backward
      // First, skip any spaces immediately to the left
      while (pos > 0 && !isWordChar(currentLine[pos - 1])) {
        pos--;
      }
      // Now move to the start of this word
      while (pos > 0 && isWordChar(currentLine[pos - 1])) {
        pos--;
      }
      // If we've landed on a space, skip any more spaces
      while (pos > 0 && !isWordChar(currentLine[pos - 1])) {
        pos--;
      }

      pos = pos + lineStart;

      if (pos == lineStart && this.selectionStart !== lineStart) {
        // Move to the start of the current line if the prev word is the first word in the line
        pos = lineStart;
      } else if (pos < lineStart || pos == lineStart) {
        // Move to the end of the previous line if we're at the start of the current line
        pos = lineStart - 1;
      }
    } else {
      // Moving forward
      // Skip the current word if we're in the middle of one
      while (pos < length && isWordChar(currentLine[pos])) {
        pos++;
      }
      // Skip any spaces
      while (pos < length && !isWordChar(currentLine[pos])) {
        pos++;
      }

      if (pos == length && this.selectionStart != length) {
        // Move to the end of the current line if the word is the last word in the line
        pos = lineStart + length;
      } else if (pos > lineStart + length || pos == length) {
        // Move to the start of the next line if we're at the end of the current line
        pos = lineStart + length + 1;
      }

      pos = pos + lineStart;
    }

    return pos;
  }

  moveByWord(direction: MoveDirectionType) {
    const wordStart = this.findNextWordPosition(direction);

    this.#setCursorPosition(wordStart);
  }

  #getSelectedText() {
    return window.getSelection()?.toString();
  }

  #deselectLetter(direction: MovingDirection) {
    const start = this.selectionStart + DeleteDirection[direction!].endOffset;
    const end = this.selectionEnd + DeleteDirection[direction!].startOffset;

    this.textArea.setSelectionRange(start, end);
  }

  selectLetterLeft() {
    if (this.#getSelectedText() !== "" && this.direction == "right") {
      this.#deselectLetter("left");
      return;
    }

    this.#updateDirection("left");

    const start = Math.max(0, this.selectionStart - 1);
    const end = this.selectionEnd;

    this.textArea.setSelectionRange(start, end);
  }

  selectLetterRight() {
    if (this.#getSelectedText() !== "" && this.direction == "left") {
      this.#deselectLetter("right");
      return;
    }

    this.#updateDirection("right");

    const start = this.selectionStart;
    const end = this.selectionEnd;

    const newStart = start;
    const newEnd = Math.min(end + 1, this.textArea.value.length);
    this.textArea.setSelectionRange(newStart, newEnd);
  }

  deleteLetter(direction: DeleteDirectionType) {
    if (this.#getSelectedText() === this.value) {
      this.setTextWithCursorPosition("", this.selectionStart);
      return;
    }

    if (this.selectionStart == 0 && direction == "left") {
      return;
    }

    const { startOffset, endOffset } = DeleteDirection[direction];
    this.setTextWithCursorPosition(
      this.value.slice(0, this.selectionStart + startOffset) +
        this.value.slice(this.selectionEnd + endOffset),
      this.selectionStart + startOffset
    );
  }
}

export default TextEditor;
