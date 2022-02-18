export const formatDate = (dateObj) => {
  if (!(dateObj instanceof Date)) {
    throw new Error(
      "The input of formatDate must be an instance of Date object"
    );
  }
  const day = `0${dateObj.getDate()}`.slice(-2);
  const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
};

export const randomString = (length = 8) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};
