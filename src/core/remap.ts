import {
  PerformRemapActionArgs,
  RemapAction,
  SUPPORTED_MODIFIERS,
} from "@/types/types";
import TextEditor from "@/core/editor";

const remapActionMap: Record<string, RemapAction> = {
  a: RemapAction.SelectAll,
  s: RemapAction.Cut,
  d: RemapAction.Copy,
  f: RemapAction.Paste,
  j: RemapAction.MoveLeft,
  k: RemapAction.MoveDown,
  u: RemapAction.MoveStartLine,
  o: RemapAction.MoveEndLine,
  l: RemapAction.MoveRight,
  i: RemapAction.MoveUp,
  n: RemapAction.Backspace,
  m: RemapAction.Delete,
  el: RemapAction.MoveRightWord,
  ej: RemapAction.MoveLeftWord,
  shiftl: RemapAction.SelectLetterRight,
  shiftj: RemapAction.SelectLetterLeft,
};

export function performRemapAction(args: PerformRemapActionArgs): void {
  const textEditor = new TextEditor(args);

  const actionMap: { [key in RemapAction]: () => void } = {
    [RemapAction.SelectAll]: () => textEditor.selectAll(),
    [RemapAction.Cut]: () => textEditor.cut(),
    [RemapAction.Copy]: () => textEditor.copy(),
    [RemapAction.Paste]: () => textEditor.paste(),
    [RemapAction.MoveLeft]: () => textEditor.moveHorizontal("left"),
    [RemapAction.MoveRight]: () => textEditor.moveHorizontal("right"),
    [RemapAction.MoveUp]: () => textEditor.moveVertical("up"),
    [RemapAction.MoveDown]: () => textEditor.moveVertical("down"),
    [RemapAction.MoveStartLine]: () => textEditor.moveHorizontal("left", true),
    [RemapAction.MoveEndLine]: () => textEditor.moveHorizontal("right", true),
    [RemapAction.Backspace]: () => textEditor.deleteLetter("left"),
    [RemapAction.Delete]: () => textEditor.deleteLetter("right"),
    [RemapAction.MoveRightWord]: () => textEditor.moveRightWord(),
    [RemapAction.MoveLeftWord]: () => textEditor.moveLeftWord(),
    [RemapAction.SelectLetterLeft]: () => textEditor.selectLetterLeft(),
    [RemapAction.SelectLetterRight]: () => textEditor.selectLetterRight(),
  };

  // Execute the action if it exists in the map
  const action = actionMap[args.action];
  if (action) {
    action();
  }
}

export function generateActionKey(
  keyState: Map<string, boolean>,
  key: string
): RemapAction | null {
  const modifiers = SUPPORTED_MODIFIERS.slice(1); // Remove capslock since it is the base modifier
  const activeModifiers = modifiers.filter((mod) => keyState.get(mod));

  const allCombinations = getCombinations(activeModifiers);

  allCombinations.sort((a, b) => b.length - a.length);

  for (const combination of allCombinations) {
    const actionKey = [...combination, key].join("");
    const action = remapActionMap[actionKey];
    if (action) return action;
  }

  return remapActionMap[key] || null;
}

function getCombinations<T>(arr: T[]): T[][] {
  const result: T[][] = [[]];
  for (const item of arr) {
    const newCombinations = result.map((comb) => [...comb, item]);
    result.push(...newCombinations);
  }
  return result.slice(1);
}
