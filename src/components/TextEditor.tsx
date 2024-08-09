import InputArea from "@/components/InputArea";
import KeyCapture from "@/components/KeyCapture";
import LastAction from "@/components/LastAction";
import TextEditorHeader from "@/components/TextEditorHeader";

function TextEditor() {
  return (
    <div className="p-5 mt-5 text-white rounded-lg bg-opacity-30 bg-neutral-900 backdrop-filter backdrop-blur-lg border-slate-300 border-2 flex flex-col justify-between">
      <div>
        <TextEditorHeader />
        <InputArea />
      </div>
      <div className="flex justify-between">
        <LastAction />
        <KeyCapture />
      </div>
    </div>
  );
}

export default TextEditor;
