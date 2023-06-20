import { create } from "zustand";
import data from "./data";

const timeRangeToOffset = ([start, end]) => {
  const offset = start / 60;
  const length = end / 60 - offset;
  return { offset, length };
};

const entryToDisplayItem = (obj) => {
  const { offset, length } = timeRangeToOffset(obj.timeRange);

  return {
    id: obj.id,
    day: obj.day,
    comfortRange: obj.comfortRange,
    offset,
    length
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
        items: newItems
      };
    });
  }
}));
