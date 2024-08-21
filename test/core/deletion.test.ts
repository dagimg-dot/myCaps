import { describe, it, beforeEach, expect, vi, afterEach } from "vitest";
import TextEditor from "../../src/core/editor";

describe("Deletion", () => {
  let textArea: HTMLTextAreaElement;
  let editor: TextEditor;
  let setCursorPosition: (position: number) => void;

  beforeEach(() => {
    textArea = document.createElement("textarea");
    textArea.value = `first line
second line
third line`;
    document.body.appendChild(textArea);

    setCursorPosition = (position: number) => {
      textArea.setSelectionRange(position, position);
    };

    // Initialize the TextEditor instance
    editor = new TextEditor({
      textareaRef: textArea,
      setTextWithCursorPosition: (text: string, cursorPosition: number) => {
        textArea.value = text;
        textArea.selectionStart = cursorPosition;
        textArea.selectionEnd = cursorPosition;
      },
    });
  });

  it("should delete the word to the left of the cursor (capslock + e + n)", () => {
    const word = "line";
    const curPos = textArea.value.indexOf(word) + word.length;
    const wordStart = textArea.value.indexOf(word) - 1;
    setCursorPosition(curPos);

    editor.deleteWord("left");

    const expectedText =
      textArea.value.substring(0, wordStart) +
      textArea.value.substring(textArea.selectionEnd);

    expect(textArea.value).toBe(expectedText);
    expect(textArea.selectionStart).toBe(wordStart);
    expect(textArea.selectionEnd).toBe(wordStart);
  });

  it("should ignore spaces when finding the word to delete", () => {
    textArea.value = `first line
second line                   
third line`;
    const word = "second";
    const curPos = textArea.value.indexOf(word) + word.length + 14;
    const wordStart = textArea.value.indexOf(word) + word.length;
    setCursorPosition(curPos);

    editor.deleteWord("left");

    expect(textArea.value).toBe(
      textArea.value.substring(0, wordStart) +
        textArea.value.substring(textArea.selectionEnd)
    );
    expect(textArea.selectionStart).toBe(wordStart);
    expect(textArea.selectionEnd).toBe(wordStart);
  });

  afterEach(() => {
    document.body.removeChild(textArea);
    vi.restoreAllMocks();
  });
});
