export const formatDate = (dateObj) => {
  const day = `0${dateObj.getDate()}`.slice(-2);
  const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
};
