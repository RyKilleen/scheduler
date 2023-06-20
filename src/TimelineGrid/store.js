import { create } from "zustand";
import data from "./data";
import "./transform";

const timeRangeToOffset = ({ start, duration }) => {
  const offset = start / 60;
  const length = duration / 60;
  return { offset, length };
};

const entryToDisplayItem = (obj) => {
  const { offset, length } = timeRangeToOffset(obj);

  return {
    id: obj.id,
    day: obj.day,
    comfortRange: obj.comfortRange,
    offset,
    length,
  };
};

export const useStore = create((set, get) => ({
  items: data.map(entryToDisplayItem),
  getItem: (findId) => get().items.find(({ id }) => id === findId),
  updateItem: (idToUpdate, offset, length) => {
    set((state) => {
      const newItems = [...state.items];

      const item = newItems.find(({ id }) => idToUpdate === id);
      item.offset = offset;
      item.length = length;

      console.log({ state, newItems });

      return {
        ...state,
        items: newItems,
      };
    });
  },
}));
