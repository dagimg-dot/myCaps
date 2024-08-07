import KeyCapture from "./KeyCapture";
import TextEditorHeader from "./TextEditorHeader";

function TextEditor() {
  return (
    <div className="p-5 mt-5 text-white rounded-lg bg-opacity-30 bg-neutral-900 backdrop-filter backdrop-blur-lg border-slate-300 border-2 flex flex-col justify-between">
      <div>
        <TextEditorHeader />
      </div>
      <div className="flex justify-between">
        <KeyCapture />
      </div>
    </div>
  );
}

export default TextEditor;
