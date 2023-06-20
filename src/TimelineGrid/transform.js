import data from "./data.json";
import { stringToArray, arrayToString } from "cron-converter";

const hashComfortDuration = ({ start, duration, comfortRange }) => {
  return JSON.stringify({ start, duration, comfortRange });
};

/*
 * description: Create a hashmap of entries by start / duration / comfortRange
 */
export const mergeData = (data) => {
  return data.reduce((dict, item) => {
    const key = hashComfortDuration(item);
    const exists = dict.get(key);

    if (!exists) {
      dict.set(key, { ...item, day: [item.day] });
    } else {
      dict.set(key, { ...item, ...exists, day: [item.day, ...exists.day] });
    }
    return dict;
  }, new Map());
};

/*
 * Convert a hashmap entry to a cron string
 */
const itemToCron = (item) => {
  const minutes = item.start % 60;
  const hours = (item.start - minutes) / 60;
  const str = `${minutes} ${hours} ${CRON_ALL_DAYS} ${CRON_ALL_MONTHS} ${item.day}`;
  return arrayToString(stringToArray(str));
};
const CRON_ALL_DAYS = "1-31";
const CRON_ALL_MONTHS = "1-12";
const itemsToCron = () => {
  return [...mergeData(data).values()].map((i) => ({
    duration: i.duration,
    comfortRange: i.comfortRange,
    start: itemToCron(i),
    label: "Occupied",
  }));
};

const transformItemsToCron = itemsToCron();

const cronToItems = (test) => {
  return test
    .map(({ start, duration, comfortRange }) => {
      const [min, hour, _dom, _month, dayOfWeek] = stringToArray(start);
      // Right now our Map hashes by start time. We can assume a singular min and hour.
      const minutes = min[0] / 60;
      const offset = hour[0] + minutes;
      const test = dayOfWeek
        .map((d) => ({ offset, duration, day: d, comfortRange }))
        .flat();
      return test;
    })
    .flat();
};

const transformCronToItems = cronToItems(transformItemsToCron);
