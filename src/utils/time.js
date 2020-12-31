const timeUnits = [
  { name: "second", ms: 1000, threshold: 50, single: "a second" },
  { name: "minute", ms: 60000, threshold: 50, single: "a minute" },
  { name: "hour", ms: 3600000, threshold: 22, single: "an hour" },
  { name: "day", ms: 86400000, threshold: 7, single: "a day" },
  { name: "week", ms: 604800000, threshold: 3.5, single: "a week" },
  { name: "month", ms: 2592000000, threshold: 11, single: "a month" },
  {
    name: "year",
    ms: 31536000000,
    threshold: Infinity,
    single: "a year",
  },
];

// eslint-disable-next-line import/prefer-default-export
export const readableElapsedTimeUTC = (sinceTime) => {
  const diff = Date.now() - sinceTime;
  const unit = timeUnits.find((u) => diff <= u.threshold * u.ms);
  const t = Math.floor(diff / unit.ms);

  if (unit.name === "second" || (unit.name === "minute" && t === 0)) {
    return "just now";
  }

  return `${t <= 1 ? unit.single : `${t} ${unit.name}s`} ago`;
};
