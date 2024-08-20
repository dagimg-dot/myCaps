import { describe, it, beforeEach, expect } from "vitest";
import TextEditor from "../../src/core/editor";

describe("Selection", () => {
  let textArea: HTMLTextAreaElement;
  let editor: TextEditor;

  beforeEach(() => {
    textArea = document.createElement("textarea");
    textArea.value = `first line
second line
third line`;
    document.body.appendChild(textArea);

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

  it("should select all text", () => {
    editor.selectAll();
    expect(textArea.selectionStart).toBe(0);
    expect(textArea.selectionEnd).toBe(textArea.value.length);
  });
});
