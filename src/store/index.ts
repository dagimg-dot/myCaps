import { create } from "zustand";
import { GlobalState, MovingDirection } from "@/types/types";

const initialState: GlobalState = {
  lastAction: "",
  direction: null,
  updateLastAction: () => {},
  updateDirection: () => {},
};

const useGlobalStore = create<GlobalState>((set) => ({
  ...initialState,
  updateLastAction: (action: string) => set({ lastAction: action }),
  updateDirection: (direction: MovingDirection) =>
    set({ direction: direction }),
}));

export default useGlobalStore;
