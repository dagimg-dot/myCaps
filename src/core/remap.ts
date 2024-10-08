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
  k: RemapAction.MoveDown, // Not tested
  u: RemapAction.MoveStartLine,
  o: RemapAction.MoveEndLine,
  l: RemapAction.MoveRight,
  i: RemapAction.MoveUp, // Not tested
  n: RemapAction.Backspace, // Not tested
  m: RemapAction.Delete, // Not tested
  el: RemapAction.MoveRightWord,
  ej: RemapAction.MoveLeftWord,
  shiftl: RemapAction.SelectLetterRight, // Not tested
  shiftj: RemapAction.SelectLetterLeft, // Not tested
  en: RemapAction.DeleteWordLeft,
  em: RemapAction.DeleteWordRight, // Not tested
  eshiftl: RemapAction.SelectWordRight, // Not tested
  eshiftj: RemapAction.SelectWordLeft, // Not tested
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
    [RemapAction.MoveRightWord]: () => textEditor.moveByWord("right"),
    [RemapAction.MoveLeftWord]: () => textEditor.moveByWord("left"),
    [RemapAction.SelectLetterLeft]: () => textEditor.selectLetterLeft(),
    [RemapAction.SelectLetterRight]: () => textEditor.selectLetterRight(),
    [RemapAction.DeleteWordRight]: () => textEditor.deleteWord("right"),
    [RemapAction.DeleteWordLeft]: () => textEditor.deleteWord("left"),
    [RemapAction.SelectWordRight]: () => textEditor.selectWordRight(),
    [RemapAction.SelectWordLeft]: () => textEditor.selectWordLeft(),
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
