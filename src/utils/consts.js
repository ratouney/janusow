export const API_URL = 'https://ow-api.com/v1/stats';
// export const API_URL = 'http://192.168.99.100:8000/v1/stats';

export const LANGUAGES = [
  {
    key:   'de',
    value: 'de',
    text:  'Deutsch',
  },
  {
    key:   'fr',
    value: 'fr',
    text:  'Francais',
  },
  {
    key:   'en',
    value: 'en',
    text:  'English',
  },
];

export const REGIONS = [
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

export const PLATFORMS = [
  {
    key:   '1',
    value: 'pc',
    text:  'Masterrace',
  },
  {
    key:   '2',
    value: 'psn',
    text:  'Playstation 4',
  },
  {
    key:   '3',
    value: 'xbl',
    text:  'Xbox One',
  },
];

export const HERO_COLORS = {
  ana:        'rgb(204, 194, 174)',
  bastion:    'rgb(110, 153, 77)',
  doomfist:   'rgb(224, 78, 52)',
  dVa:        'rgb(255, 127, 209)',
  genji:      'rgb(132, 254, 1)',
  hanzo:      'rgb(147, 136, 72)',
  junkrat:    'rgb(211, 147, 8)',
  lucio:      'rgb(139, 236, 34)',
  mccree:     'rgb(141, 57, 57)',
  mei:        'rgb(154, 219, 244)',
  mercy:      'rgb(255, 225, 108)',
  orisa:      'rgb(220, 154, 0)',
  pharah:     'rgb(27, 101, 198)',
  reaper:     'rgb(39, 39, 37)',
  reinhardt:  'rgb(170, 149, 142)',
  roadhog:    'rgb(193, 148, 119)',
  soldier76:  'rgb(88, 112, 182)',
  sombra:     'rgb(117, 27, 156)',
  symmetra:   'rgb(92, 236, 255)',
  torbjorn:   'rgb(255, 98, 0)',
  tracer:     'rgb(248, 145, 27)',
  widowmaker: 'rgb(111, 111, 174)',
  winston:    'rgb(76, 80, 92)',
  zarya:      'rgb(245, 113, 168)',
  zenyatta:   'rgb(199, 156, 0)',
};

export const HERO_ICONS = {
  ana:        'https://blzgdapipro-a.akamaihd.net/hero/ana/hero-select-portrait.png',
  bastion:    'https://blzgdapipro-a.akamaihd.net/hero/bastion/hero-select-portrait.png',
  doomfist:   'https://blzgdapipro-a.akamaihd.net/hero/doomfist/hero-select-portrait.png',
  dVa:        'https://blzgdapipro-a.akamaihd.net/hero/dva/hero-select-portrait.png',
  genji:      'https://blzgdapipro-a.akamaihd.net/hero/genji/hero-select-portrait.png',
  hanzo:      'https://blzgdapipro-a.akamaihd.net/hero/hanzo/hero-select-portrait.png',
  junkrat:    'https://blzgdapipro-a.akamaihd.net/hero/junkrat/hero-select-portrait.png',
  lucio:      'https://blzgdapipro-a.akamaihd.net/hero/lucio/hero-select-portrait.png',
  mccree:     'https://blzgdapipro-a.akamaihd.net/hero/mccree/hero-select-portrait.png',
  mei:        'https://blzgdapipro-a.akamaihd.net/hero/mei/hero-select-portrait.png',
  mercy:      'https://blzgdapipro-a.akamaihd.net/hero/mercy/hero-select-portrait.png',
  orisa:      'https://blzgdapipro-a.akamaihd.net/hero/orisa/hero-select-portrait.png',
  pharah:     'https://blzgdapipro-a.akamaihd.net/hero/pharah/hero-select-portrait.png',
  reaper:     'https://blzgdapipro-a.akamaihd.net/hero/reaper/hero-select-portrait.png',
  reinhardt:  'https://blzgdapipro-a.akamaihd.net/hero/reinhardt/hero-select-portrait.png',
  roadhog:    'https://blzgdapipro-a.akamaihd.net/hero/roadhog/hero-select-portrait.png',
  soldier76:  'https://blzgdapipro-a.akamaihd.net/hero/soldier-76/hero-select-portrait.png',
  sombra:     'https://blzgdapipro-a.akamaihd.net/hero/sombra/hero-select-portrait.png',
  symmetra:   'https://blzgdapipro-a.akamaihd.net/hero/symmetra/hero-select-portrait.png',
  torbjorn:   'https://blzgdapipro-a.akamaihd.net/hero/torbjorn/hero-select-portrait.png',
  tracer:     'https://blzgdapipro-a.akamaihd.net/hero/tracer/hero-select-portrait.png',
  widowmaker: 'https://blzgdapipro-a.akamaihd.net/hero/widowmaker/hero-select-portrait.png',
  winston:    'https://blzgdapipro-a.akamaihd.net/hero/winston/hero-select-portrait.png',
  zarya:      'https://blzgdapipro-a.akamaihd.net/hero/zarya/hero-select-portrait.png',
  zenyatta:   'https://blzgdapipro-a.akamaihd.net/hero/zenyatta/hero-select-portrait.png',
};

export const HERO_NAMES = [
  'ana',
  'bastion',
  'doomfist',
  'dVa',
  'genji',
  'hanzo',
  'junkrat',
  'lucio',
  'mccree',
  'mei',
  'mercy',
  'orisa',
  'pharah',
  'reaper',
  'reinhardt',
  'roadhog',
  'soldier76',
  'sombra',
  'symmetra',
  'torbjorn',
  'tracer',
  'widowmaker',
  'winston',
  'zarya',
  'zenyatta',
];

export const HERO_IMPORTANT_STATS = {
  ana: [
    {
      key:  'heroSpecific.scopedAccuracy',
      name: 'Scoped Accuracy',
    },
  ],
  bastion:   [],
  doomfist:  [],
  dVa:       [],
  genji:     [],
  hanzo:     [],
  junkrat:   [],
  lucio:     [],
  mccree:    [],
  mei:       [],
  mercy:     [],
  orisa:     [],
  pharah:    [],
  reaper:    [],
  reinhardt: [],
  roadhog:   [
    {
      key:  'heroSpecific.hookAccuracy',
      name: 'Hook Accuracy',
    },
  ],
  soldier76:  [],
  sombra:     [],
  symmetra:   [],
  torbjorn:   [],
  tracer:     [],
  widowmaker: [],
  winston:    [],
  zarya:      [],
  zenyatta:   [],
};

export const FETCH_NONE = 'FETCH_NONE';
export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_COMPLETED = 'FETCH_COMPLETED';
export const FETCH_CRASHED = 'FETCH_CRASHED';
