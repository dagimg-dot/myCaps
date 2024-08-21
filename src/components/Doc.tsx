import React from "react";

function Heading1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold mb-5">{children}</h1>;
}

function Heading2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold my-5">{children}</h2>;
}

function KeyGroup({
  title,
  children,
  cols = 4,
}: {
  title: string;
  children: React.ReactNode;
  cols?: number;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-violet-400">{title}</h3>
      <div
        className={`grid ${
          cols > 1 ? "grid-cols-2" : ""
        } gap-4 sm:grid-cols-${cols}`}
      >
        {children}
      </div>
    </div>
  );
}

function Key({ keyName, action }: { keyName: string; action?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="bg-slate-700 text-slate-200 px-2 py-1 rounded font-mono">
        {keyName}
      </span>
      <span className="text-slate-300">{action}</span>
    </div>
  );
}

function Doc() {
  return (
    <div className="p-5 mt-5 text-slate-300 text-lg rounded-lg bg-opacity-30 bg-stone-800 backdrop-filter backdrop-blur-lg border-slate-300 border-2 overflow-y-auto">
      <Heading1>MyCaps</Heading1>
      <p>
        <strong>MyCaps</strong> is a simple <strong>CapsLock Emulator</strong> I
        built in couple of days just to give you the taste of how I use my
        keyboard. Maybe you don't like it, but thanks for checking it out!
      </p>
      <Heading2>Why ?</Heading2>
      <p>
        How often do you guys use your CapsLock? Not much right. I think its in
        the perfect position but its not giving the functionality it should
        give. So what did I do as a fellow programmer? I mapped it to more
        useful keys. Buckle up this is gonna be hard to accept 😂.
      </p>
      <Heading2>How ?</Heading2>
      <p>
        I am using Linux, specifically Fedora 40 as my daily driver for almost 4
        months now. And I used custom Windows 11 for almost 1 year and half
        before that. I used this remap in both OSs using different softwares. On
        Windows I used{" "}
        <strong>
          <a
            href="https://www.autohotkey.com/"
            target="_blank"
            className="text-violet-600"
          >
            AutoHotKey
          </a>
        </strong>{" "}
        and on Linux I am using{" "}
        <strong>
          <a
            href="https://github.com/rvaiya/keyd"
            target="_blank"
            className="text-violet-600"
          >
            keyd
          </a>
        </strong>
        . And here I want to show you what you can be capable of by remapping
        CapsLock to work as modifier and use it for text editing and more.
      </p>
      <Heading2>Guide</Heading2>
      <p>
        When you are in this webapp,
        <span className="bg-slate-700 text-slate-200 px-2 py-1 mx-1 rounded font-mono">
          CapsLock
        </span>
        is like your magic wand. You can do a lot of things with it. Just hold{" "}
        <span className="bg-slate-700 text-slate-200 px-2 py-1 mx-1 rounded font-mono">
          CapsLock
        </span>
        with your left hand pinky finger and see the magic happen:
      </p>

      <div className="mt-4 space-y-6">
        <KeyGroup title="Left Hand (Home Row)">
          <Key keyName="A" action="Select All" />
          <Key keyName="S" action="Cut" />
          <Key keyName="D" action="Copy" />
          <Key keyName="F" action="Paste" />
        </KeyGroup>

        <KeyGroup title="Right Hand (Home Row)">
          <Key keyName="J" action="Move Left" />
          <Key keyName="K" action="Move Down" />
          <Key keyName="L" action="Move Right" />
          <Key keyName="I" action="Move Up" />
        </KeyGroup>

        <KeyGroup title="Right Hand (Index Finger)">
          <Key keyName="N" action="Backspace" />
          <Key keyName="M" action="Delete" />
        </KeyGroup>

        <KeyGroup title="Right Hand (Middle Finger) - Not Implemented">
          <Key keyName="," action="Undo" />
          <Key keyName="." action="Redo" />
        </KeyGroup>

        <KeyGroup title="Press 'E' with your left hand middle finger" cols={2}>
          <Key keyName="L" action="Move one word to the right" />
          <Key keyName="J" action="Move one word to the left" />
          <Key keyName="N" action="Delete one word to the left" />
          <Key keyName="M" action="Delete one word to the right" />
        </KeyGroup>

        <KeyGroup
          title="Press 'Shift' with your right hand pinky finger"
          cols={2}
        >
          <Key keyName="L" action="Select one word to the right" />
          <Key keyName="J" action="Select one word to the left" />
        </KeyGroup>
      </div>

      <p className="mt-6">
        This layout is what I use everyday for all my text editing needs
        including writing docs, code(with VIM), chatting, etc.
      </p>

      <p className="my-6">
        Aside from text editing, CapsLock is my go-to modifier key for a lot of
        things. Let me show you some of them.
      </p>

      <KeyGroup title="Other Combinations I use" cols={0}>
        <Key keyName="CapsLock + 8" action="Refresh (F5/Ctrl+R)" />
        <Key
          keyName="CapsLock + 0"
          action="Format Code (Alt+Shift+F) in VSCode"
        />
        <Key
          keyName="CapsLock + 2/3"
          action="Navigate to Next/Previous Workspace"
        />
        <Key keyName="CapsLock + /" action="Comment/Uncomment in VSCode" />
        <Key keyName="CapsLock + E + F" action="Search in VSCode" />
        <Key keyName="CapsLock + ]" action="Open Cliboard History" />
      </KeyGroup>
    </div>
  );
}

export default Doc;
