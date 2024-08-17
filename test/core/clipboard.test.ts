import { describe, it, beforeEach, vi, expect, afterEach } from "vitest";
import clipboard from "../../src/core/clipboard";

describe("VirtualClipboard", () => {
  let textarea: HTMLTextAreaElement;
  let mockSelectedText = "";
  let setMockSelection: (start: number, end: number) => void;

  beforeEach(() => {
    textarea = document.createElement("textarea");
    textarea.value = "Abebe bere, bere, bere";
    document.body.appendChild(textarea);

    setMockSelection = (start: number, end: number) => {
      mockSelectedText = textarea.value.substring(start, end);
      textarea.setSelectionRange(start, end);
    };

    // Mock window.getSelection()
    // This is because the window.getSelection() method used in the clipboard.ts
    // file is not available in the test environment
    vi.spyOn(window, "getSelection").mockImplementation(
      () =>
        ({
          toString: () => mockSelectedText,
          removeAllRanges: vi.fn(),
          addRange: vi.fn(),
          anchorNode: textarea,
        } as unknown as Selection)
    );

    setMockSelection(0, 5); // Initial selection
  });

  it("should copy selected text to clipboard", () => {
    clipboard.copy(textarea.value);
    expect(clipboard.getHistory()).toContain(mockSelectedText);

    setMockSelection(7, 12);
    clipboard.copy(textarea.value);
    expect(clipboard.getHistory()).toContain(mockSelectedText);
  });

  it("should paste the last copied text", () => {
    clipboard.copy(textarea.value);
    const pastedText = clipboard.paste();

    expect(pastedText).toBe(mockSelectedText);
  });

  it("should handle changing selections", () => {
    clipboard.copy(textarea.value);
    expect(clipboard.getHistory()).toContain(mockSelectedText);

    setMockSelection(7, 12);
    clipboard.copy(textarea.value);
    expect(clipboard.getHistory()).toContain(mockSelectedText);

    const pastedText = clipboard.paste();
    expect(pastedText).toBe(mockSelectedText);
  });

  it("should handle empty selections", () => {
    setMockSelection(0, 0); // Empty selection
    clipboard.copy(textarea.value);
    expect(clipboard.getHistory()).not.toContain(mockSelectedText);
    expect(clipboard.paste()).toBeUndefined();
  });

  it("should handle multi line selections", () => {
    textarea.value = `this is a
multi line text`;

    setMockSelection(6, 11);
    clipboard.copy(textarea.value);

    console.log(clipboard.getHistory());

    expect(clipboard.getHistory()).toContain(mockSelectedText);
  });

  it("should handle multi line pastes", () => {
    textarea.value = `this is a
multi line text`;
    setMockSelection(6, 11);
    clipboard.copy(textarea.value);

    const pastedText = clipboard.paste();

    expect(pastedText).toBe(mockSelectedText);
  });

  afterEach(() => {
    clipboard.clear();
    document.body.removeChild(textarea);
    vi.restoreAllMocks();
  });
});
