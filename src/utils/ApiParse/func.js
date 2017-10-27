export const playtimeToMinute = (timeAsString) => {
  const time = timeAsString.split(' ');

  if (time[1] === 'seconds') {
    return time[0] / 60;
  } else if (time[1] === 'miuntes') {
    return time[0];
  }
  return time[0] * 60;
};

export const playtimePercentage = (total, curr) => {
  return playtimeToMinute(curr) / (playtimeToMinute(total) / 100);
};
