import { create } from "zustand";
import { GlobalState } from "@/types/types";


const initialState: GlobalState = {
  lastAction: "",
  updateLastAction: () => {},
};

const useGlobalStore = create<GlobalState>((set) => ({
  ...initialState,
  updateLastAction: (action: string) => set({ lastAction: action }),
}));

export default useGlobalStore;
