import { PerformRemapActionArgs, RemapAction } from "@/types/types";
import TextEditor from "@/core/editor";

const remapActionMap: Record<string, RemapAction> = {
  a: RemapAction.SelectAll,
  s: RemapAction.Cut,
  d: RemapAction.Copy,
  f: RemapAction.Paste,
  j: RemapAction.MoveLeft,
  k: RemapAction.MoveDown,
  l: RemapAction.MoveRight,
  i: RemapAction.MoveUp,
  n: RemapAction.Backspace,
  m: RemapAction.Delete,
};

export function performRemapAction(args: PerformRemapActionArgs): void {
  const textEditor = new TextEditor(args);
  switch (args.action) {
    case RemapAction.SelectAll:
      textEditor.selectAll();
      break;
    case RemapAction.Cut:
      textEditor.cut();
      break;
    case RemapAction.Copy:
      textEditor.copy();
      break;
    case RemapAction.Paste:
      textEditor.paste();
      break;
    case RemapAction.MoveLeft:
      textEditor.moveHorizontal("left");
      break;
    case RemapAction.MoveRight:
      textEditor.moveHorizontal("right");
      break;
    case RemapAction.Backspace:
      textEditor.deleteLetter("left");
      break;
    case RemapAction.Delete:
      textEditor.deleteLetter("right");
      break;
  }
}

export function getRemapAction(key: string): RemapAction | null {
  return remapActionMap[key.toLowerCase()] || null;
}
