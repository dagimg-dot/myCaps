import { describe, it, beforeEach, expect, vi, afterEach } from "vitest";
import TextEditor from "../../src/core/editor";
import clipboard from "../../src/core/clipboard";

describe("TextEditor", () => {
  let textArea: HTMLTextAreaElement;
  let editor: TextEditor;
  let mockSelectedText = "";
  let setMockSelection: (start: number, end: number) => void;

  beforeEach(() => {
    textArea = document.createElement("textarea");
    textArea.value = `this is a test
second line`;
    document.body.appendChild(textArea);

    setMockSelection = (start: number, end: number) => {
      mockSelectedText = textArea.value.substring(start, end);
      textArea.setSelectionRange(start, end);
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

  

  afterEach(() => {
    clipboard.clear();
    document.body.removeChild(textArea);
    vi.restoreAllMocks();
  });
});
