export const dateFormating = date => {
  return (
    date.substring(5, 7) +
    '/' +
    date.substring(8, 10) +
    '/' +
    date.substring(0, 4)
  );
};

export const convertToUppercase = str => {
  return str.toUpperCase();
};
