const REGIONS = [
  {
    key:   '1',
    value: 'eu',
    text:  'Europe',
  },
  {
    key:   '2',
    value: 'us',
    text:  'US',
  },
  {
    key:   '3',
    value: 'kr',
    text:  'Korea',
  },
];

const PLATFORMS = [
  {
    key:   '1',
    value: 'pc',
    text:  'Masterrace',
  },
  {
    key:   '2',
    value: 'pns',
    text:  'Playstation 4',
  },
  {
    key:   '3',
    value: 'xbl',
    text:  'Xbox One',
  },
];

const FETCH_NONE = 'FETCH_NONE';
const FETCH_STARTED = 'FETCH_STARTED';
const FETCH_COMPLETED = 'FETCH_COMPLETED';
const FETCH_CRASHED = 'FETCH_CRASHED';

export {
  FETCH_NONE,
  FETCH_STARTED,
  FETCH_COMPLETED,
  FETCH_CRASHED,
  REGIONS,
  PLATFORMS,
};
