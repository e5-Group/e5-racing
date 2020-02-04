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

export const finishedPosition = number => {
  let placed;
  switch (number) {
    case '1':
      placed = number + 'st';
      break;

    case '2':
      placed = number + 'nd';
      break;

    case '3':
      placed = number + 'rd';
      break;

    default:
      placed = number + 'th';
      break;
  }
  return placed;
};

export const formatStrTime = time => {
  let time_formatted;
  let len = time.length;
  if (len === 4) {
    time_formatted = time.substring(0, 2) + '.' + time.substring(2, 4); // 00.00
  } else if (len === 5) {
    time_formatted =
      time.substring(0, 1) +
      ':' +
      time.substring(1, 3) +
      '.' +
      time.substring(3, 5); // 0:00.00
  } else {
    time_formatted = time;
  }
  return time_formatted;
};
