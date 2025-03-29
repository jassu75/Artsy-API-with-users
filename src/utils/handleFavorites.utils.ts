export const handleInterval = (createdAt: Date) => {
  const present = new Date();
  const createdDate = new Date(createdAt);
  const intervalSec = Math.floor(
    (present.getTime() - createdDate.getTime()) / 1000
  );
  if (intervalSec < 60) {
    return `${intervalSec} ${intervalSec === 1 ? "second" : "seconds"} ago`;
  }
  const intervalMin = Math.floor(intervalSec / 60);
  if (intervalMin < 60) {
    return `${intervalMin} ${intervalMin === 1 ? "minute" : "minutes"} ago`;
  }

  const intervalHours = Math.floor(intervalMin / 60);
  if (intervalHours < 24) {
    return `${intervalHours} ${intervalHours === 1 ? "hour" : "hours"} ago`;
  }
  const intervalDays = Math.floor(intervalHours / 24);
  if (intervalDays < 30) {
    return `${intervalDays} ${intervalDays === 1 ? "day" : "days"} ago`;
  }
  const intervalMonths = Math.floor(intervalDays / 30);
  return `${intervalMonths} ${intervalMonths === 1 ? "month" : "months"} ago`;
};
