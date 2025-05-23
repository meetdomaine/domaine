export const checkDateIsPast = (date) => {
  const todaysDate = new Date();
  return date.setHours(0, 0, 0, 0) < todaysDate.setHours(0, 0, 0, 0)
};