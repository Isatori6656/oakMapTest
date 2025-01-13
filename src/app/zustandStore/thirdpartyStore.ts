import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface thirdpartyStore {
  accessToken: string;
  type: string;
  init: (accessToken: string, type: string) => void;
}

const useThirdpartyStore = create<thirdpartyStore>()(
  devtools(
    persist(
      (set) => ({
        accessToken: "",
        type: "",
        init: (accessToken, type) =>
          set({ accessToken: accessToken, type: type }),
      }),
      {
        name: "thirdparty-storage",
      }
    )
  )
);

export default useThirdpartyStore;
