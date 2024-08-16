import useGlobalStore from "@/store";

function LastAction() {
  const { lastAction } = useGlobalStore();
  return (
    <div
      className="bg-slate-600 bg-opacity-15 p-2 rounded-lg w-1/3 h-16 text-2xl overflow-hidden whitespace-nowrap flex items-center justify-center"
      data-tooltip-id="tooltip"
      data-tooltip-content="Last Action"
    >
      {lastAction}
    </div>
  );
}

export default LastAction;
