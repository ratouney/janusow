import React from 'react';
import { round } from 'lodash';

const PercentString = ({ value, precision = 1 }) => {
  return `${round(value, precision)} %`;
};

const RatioRound = ({ valueUp, valueDown, precision = 1 }) => {
  return round(valueUp / valueDown, precision);
};

const KDR = {
  label: 'KDR',
  value: (data) => {
    return data.combat.eliminationsPerLife;
  },
};

const FinalBlowPercentage = {
  label: 'Final Blows',
  value: (data) => {
    return (<PercentString
      value={data.combat.finalBlows / (data.combat.eliminations / 100)}
      precision={2}
    />);
  },
};

const HeroToBarrierDamage = {
  label: 'Hero/Barrier Damage ratio',
  value: (data) => {
    return (<PercentString
      value={data.miscellaneous.barrierDamageDone / (data.combat.damageDone / 100)}
      precision={2}
    />);
  },
};

const DamagePer10Mins = {
  label: 'Damage per 10 minutes',
  value: (data) => {
    return round(data.average.allDamageDone * 600, 2);
  },
};

const HERO_CARD_STATS = {
  ana:        [],
  bastion:    [],
  doomfist:   [],
  dVa:        [],
  genji:      [],
  hanzo:      [],
  junkrat:    [],
  lucio:      [],
  mccree:     [],
  mei:        [],
  mercy:      [],
  orisa:      [],
  pharah:     [],
  reaper:     [],
  reinhardt:  [],
  roadhog:    [],
  soldier76:  [],
  sombra:     [],
  symmetra:   [],
  torbjorn:   [],
  tracer:     [],
  widowmaker: [
    KDR,
    FinalBlowPercentage,
    HeroToBarrierDamage,
    DamagePer10Mins,
  ],
  winston:  [],
  zarya:    [],
  zenyatta: [],
};

export default HERO_CARD_STATS;
