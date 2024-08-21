import InputArea from "@/components/InputArea";
import KeyCapture from "@/components/KeyCapture";
import LastAction from "@/components/LastAction";
import VirtualKeyboard from "./VirtualKeyboard";
import Guide from "./Guide";

function TextEditor() {
  const handleKeyPress = (keys: string[]) => {
    console.log("Key pressed:", keys);
  };
  return (
    <div className="p-5 mt-5 text-white rounded-lg bg-opacity-30 bg-neutral-900 backdrop-filter backdrop-blur-lg border-slate-300 border-2 flex flex-col justify-between overflow-y-auto">
      <VirtualKeyboard onKeyPress={handleKeyPress} />
      <Guide />
      <div>
        <InputArea />
        <div className="flex justify-between">
          <LastAction />
          <KeyCapture />
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
