import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "todo",
  storage: localStorage,
});

export const toDoState = atom({
  key: "toDo",
  default: {
    ToDo: [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
