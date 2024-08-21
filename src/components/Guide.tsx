import { RefreshCcw } from "lucide-react";
import React from "react";
import { useState } from "react";

function Key({ keyName }: { keyName: string }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="bg-slate-700 text-slate-200 px-2 py-1 rounded font-mono text-sm">
        {keyName}
      </span>
    </div>
  );
}

type KeyLineProps = {
  keyNames: string[];
  action: string;
};

function KeyLine({ keyNames, action }: KeyLineProps) {
  return (
    <div className="flex items-center space-x-2">
      {keyNames.map((keyName, index) => (
        <React.Fragment key={keyName}>
          <Key keyName={keyName} />
          {index < keyNames.length - 1 && <span>➕</span>}
        </React.Fragment>
      ))}
      <span className="text-small">{action}</span>
    </div>
  );
}

const steps = [
  {
    title: "Welcome to MyCaps!",
    content: (
      <div className="flex flex-col gap-2">
        <p>
          👉🏿 This web app allows you to remap your CapsLock key for enhanced
          text editing. Let's get started!
        </p>
        <p>👉🏿 Here, CapsLock is your magic key.</p>
        <p>
          👉🏿 It's the key that makes you a power user. At least it made me one
          😉.
        </p>
      </div>
    ),
  },
  {
    title: "Web App Usage",
    content: (
      <div className="flex flex-col gap-2">
        <p>
          👉🏿 The virtual keyboard above is to show you what keys you are
          clicking on.
        </p>
        <p>
          👉🏿 The container found in the bottom left corner is to show you your
          last action.
        </p>
        <p>
          👉🏿 The container found in the bottom right corner prints all the keys
          you are pressing.
        </p>
        <p>👉🏿 We will be focusing on the ones with blue border.</p>
      </div>
    ),
  },
  {
    title: "Basic Usage",
    content: (
      <div className="flex flex-col gap-2">
        <p>
          👉🏿 Hold the CapsLock key to access various text editing functions.
          Continue this guide to learn more or you can always refer in the
          Documentation found in the left side.
        </p>
        <p>
          👉🏿 Starting from now, CapsLock is another modifier key just like Ctrl,
          Alt, or Shift.
        </p>
        <p>
          👉🏿 You can't use the CapsLock key to write your capitalized letters.
          Thats old school.
        </p>
        <p>
          👉🏿 Use the input field below to try all the remaps avaliable in{" "}
          <strong>MyCaps</strong>.
        </p>
      </div>
    ),
  },
  {
    title: "Basic Text Manipulation",
    content: (
      <div className="flex flex-col gap-2">
        <KeyLine keyNames={["CapsLock", "A"]} action="Select All" />
        <KeyLine keyNames={["CapsLock", "S"]} action="Cut" />
        <KeyLine keyNames={["CapsLock", "D"]} action="Copy" />
        <KeyLine keyNames={["CapsLock", "F"]} action="Paste" />
      </div>
    ),
  },
  {
    title: "Horizontal Movement",
    content: (
      <div className="flex flex-col gap-2">
        <KeyLine
          keyNames={["CapsLock", "L/J"]}
          action="Move Right/Left by One Character"
        />
        <KeyLine
          keyNames={["CapsLock", "E", "L/J"]}
          action="Move Right/Left by Word"
        />
        <KeyLine keyNames={["CapsLock", "O"]} action="Move to End of Line" />
        <KeyLine keyNames={["CapsLock", "U"]} action="Move to Start of Line" />
      </div>
    ),
  },
  {
    title: "Vertical Movement",
    content: (
      <div className="flex flex-col gap-2">
        <KeyLine keyNames={["CapsLock", "I"]} action="Move Up by One Line" />
        <KeyLine keyNames={["CapsLock", "K"]} action="Move Down by One Line" />
      </div>
    ),
  },
  {
    title: "Deletion",
    content: (
      <div className="flex flex-col gap-2">
        <KeyLine
          keyNames={["CapsLock", "N"]}
          action="Delete one Character to the Left"
        />
        <KeyLine
          keyNames={["CapsLock", "M"]}
          action="Delete one Character to the Right"
        />
        <KeyLine
          keyNames={["CapsLock", "E", "N"]}
          action="Delete Word to the Left"
        />
        <KeyLine
          keyNames={["CapsLock", "E", "M"]}
          action="Delete Word to the Right"
        />
      </div>
    ),
  },
  {
    title: "Selection",
    content: (
      <div className="flex flex-col gap-2">
        <KeyLine
          keyNames={["CapsLock", "Shift", "J"]}
          action="Select One Character to the Left"
        />
        <KeyLine
          keyNames={["CapsLock", "Shift", "L"]}
          action="Select One Character to the Right"
        />
        <KeyLine
          keyNames={["CapsLock", "Shift", "E", "J"]}
          action="Select Word to the Left"
        />
        <KeyLine
          keyNames={["CapsLock", "Shift", "E", "L"]}
          action="Select Word to the Right"
        />
      </div>
    ),
  },
];

const Guide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  return (
    <div className="bg-slate-600 bg-opacity-15 p-4 rounded-lg h-full my-4 flex justify-between flex-col">
      <div>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-3">
            {steps[currentStep].title}
          </h2>
          <RefreshCcw
            className="text-violet-600 hover:text-violet-500 cursor-pointer"
            onClick={handleRestart}
            data-tooltip-id="tooltip"
            data-tooltip-content="Restart the guide"
          />
        </div>
        <div className="flex flex-col my-2">{steps[currentStep].content}</div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="bg-violet-600 text-white px-4 py-2 rounded disabled:bg-slate-400 disabled:text-slate-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="bg-violet-600 text-white px-4 py-2 rounded disabled:bg-slate-400 disabled:text-slate-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Guide;
