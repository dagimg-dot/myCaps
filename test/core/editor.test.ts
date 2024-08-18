import { describe, it, beforeEach, expect, vi, afterEach } from "vitest";
import TextEditor from "../../src/core/editor";
import clipboard from "../../src/core/clipboard";

describe("TextEditor", () => {
  let textArea: HTMLTextAreaElement;
  let editor: TextEditor;
  let mockSelectedText = "";
  let setMockSelection: (start: number, end: number) => void;
  let setCursorPosition: (position: number) => void;

  beforeEach(() => {
    textArea = document.createElement("textarea");
    textArea.value = `first line
second line
third line`;
    document.body.appendChild(textArea);

    setMockSelection = (start: number, end: number) => {
      mockSelectedText = textArea.value.substring(start, end);
      textArea.setSelectionRange(start, end);
    };

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

    // getCurrentLine() is a private method, so we need to mock it

    // Mock window.getSelection()
    // This is because the window.getSelection() method used in the clipboard.ts
    // file is not available in the test environment
    vi.spyOn(window, "getSelection").mockImplementation(
      () =>
        ({
          toString: () => mockSelectedText,
          removeAllRanges: vi.fn(),
          addRange: vi.fn(),
          anchorNode: textArea,
        } as unknown as Selection)
    );
  });

  it("should select all text", () => {
    editor.selectAll();
    expect(textArea.selectionStart).toBe(0);
    expect(textArea.selectionEnd).toBe(textArea.value.length);
  });

  it("should cut text and delete it from the textarea", () => {
    setMockSelection(0, 5); // Mock selection

    // Remove the selected text from the textarea to make the test more realistic
    const newText = textArea.value.replace(mockSelectedText, "");
    editor.cut();
    expect(textArea.value).toBe(newText);
  });

  it("should cut text and store it in the clipboard", () => {
    setMockSelection(0, 5); // Mock selection
    editor.cut();
    expect(clipboard.getHistory()).toContain(mockSelectedText);
  });

  it("should move the cursor one character to the left (capslock + j)", () => {
    const curPos = 4;
    setCursorPosition(curPos);

    editor.moveHorizontal("left");
    expect(textArea.selectionStart).toBe(curPos - 1);
    expect(textArea.selectionEnd).toBe(curPos - 1);
  });

  it("should not move the cursor if it is already at the start of the line", () => {
    const curPos = 0;
    setCursorPosition(curPos);

    editor.moveHorizontal("left");
    expect(textArea.selectionStart).toBe(curPos);
    expect(textArea.selectionEnd).toBe(curPos);
  });

  it("should move to the start of the current line if direction is left and start is true (capslock + u)", () => {
    const middleSecondLinePos = textArea.value.indexOf("second") + 4;
    const startofSecondLinePos = textArea.value.indexOf("second");
    setCursorPosition(middleSecondLinePos);

    editor.moveHorizontal("left", true);
    expect(textArea.selectionStart).toBe(startofSecondLinePos);
    expect(textArea.selectionEnd).toBe(startofSecondLinePos);
  });

  it("should move the cursor one character to the right (capslock + l)", () => {
    const curPos = 4;
    setCursorPosition(curPos);

    editor.moveHorizontal("right");
    expect(textArea.selectionStart).toBe(curPos + 1);
    expect(textArea.selectionEnd).toBe(curPos + 1);
  });

  it("should not move the cursor if it is already at the end of the line", () => {
    const curPos = textArea.value.length;
    setCursorPosition(curPos);

    editor.moveHorizontal("right");
    expect(textArea.selectionStart).toBe(curPos);
    expect(textArea.selectionEnd).toBe(curPos);
  });

  it("should move to the end of the current line if direction is right and start is true (capslock + o)", () => {
    const middleSecondLinePos = textArea.value.indexOf("second") + 4;
    const endofSecondLinePos = textArea.value.indexOf("third") - 1;
    setCursorPosition(middleSecondLinePos);

    editor.moveHorizontal("right", true);
    expect(textArea.selectionStart).toBe(endofSecondLinePos);
    expect(textArea.selectionEnd).toBe(endofSecondLinePos);
  });

  afterEach(() => {
    clipboard.clear();
    document.body.removeChild(textArea);
    vi.restoreAllMocks();
  });
});
