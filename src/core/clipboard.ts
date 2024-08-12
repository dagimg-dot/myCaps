class VirtualClipboard {
  private clipboard: string[] = [];

  public copy(originalText: string): void {
    const selectedText = this.getSelectedText();
    if (selectedText && this.isSubstring(selectedText, originalText)) {
      this.copySelectedText(selectedText);
    }
    this.periodicClear();
  }

  public paste(): string | undefined {
    return this.clipboard.length > 0
      ? this.clipboard[this.clipboard.length - 1]
      : undefined;
  }

  public getHistory(): string[] {
    return [...this.clipboard];
  }

  public clear(): void {
    this.clipboard = [];
  }

  private periodicClear(): void {
    const clipboardSize = this.clipboard.length;
    if (clipboardSize > 100) {
      this.clipboard = this.clipboard.slice(clipboardSize - 100);
    }
  }

  private getSelectedText(): string | undefined {
    const selection = window.getSelection();
    return selection && selection.toString().length > 0
      ? selection.toString()
      : undefined;
  }

  private copySelectedText(text: string): void {
    this.clipboard.push(text);
  }

  private isSubstring(selectedText: string, originalText: string): boolean {
    return originalText.includes(selectedText);
  }
}

export default new VirtualClipboard();
