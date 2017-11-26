import React from 'react';
import { round } from 'lodash';

const PercentString = ({ value, precision = 1 }) => {
  return `${round(value, precision)} %`;
};

const RatioRound = ({
  valueUp, valueDown, precision = 1, percent = false,
}) => {
  if (percent) {
    return `${round(valueUp / valueDown, precision)} %`;
  }
  return round(valueUp / valueDown, precision);
};

const KDR = {
  label: 'KDR',
  value: (data) => {
    return data.combat.eliminationsPerLife;
  },
};

const Accuracy = {
  label: 'Accuracy',
  value: (data) => {
    return data.combat.weaponAccuracy;
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

const defaultStats = [
  KDR,
  Accuracy,
  DamagePer10Mins,
  FinalBlowPercentage,
  HeroToBarrierDamage,
];

const HERO_CARD_STATS = {
  ana: [
    KDR,
    DamagePer10Mins,
    {
      label: 'Scoped Accuracy',
      value: (data) => {
        return data.heroSpecific.scopedAccuracy;
      },
    },
    {
      label: 'Nanoboost Assists per usage',
      value: (data) => {
        return (<RatioRound
          valueUp={data.heroSpecific.nanoBoostAssists}
          valueDown={data.heroSpecific.nanoBoostsApplied}
          precision={2}
        />);
      },
    },
  ],
  bastion: [
    KDR,
    Accuracy,
    DamagePer10Mins,
    {
      label: 'Recon Kills',
      value: (data) => {
        return (<RatioRound
          valueUp={data.heroSpecific.reconKills}
          valueDown={data.combat.eliminations / 100}
          percent
        />);
      },
    },
    {
      label: 'Sentry Kills',
      value: (data) => {
        return (<RatioRound
          valueUp={data.heroSpecific.sentryKills}
          valueDown={data.combat.eliminations / 100}
          percent
        />);
      },
    },
    {
      label: 'Tank Kills',
      value: (data) => {
        return (<RatioRound
          valueUp={data.heroSpecific.tankKills}
          valueDown={data.combat.eliminations / 100}
          percent
        />);
      },
    },
  ],
  doomfist: [
    ...defaultStats,
  ],
  dVa: [
    ...defaultStats,
  ],
  genji: [
    ...defaultStats,
  ],
  hanzo: [
    ...defaultStats,
  ],
  junkrat: [
    ...defaultStats,
  ],
  lucio: [
    ...defaultStats,
  ],
  mccree: [
    ...defaultStats,
  ],
  mei: [
    ...defaultStats,
  ],
  moira: [
    ...defaultStats,
  ],
  mercy: [
    ...defaultStats,
  ],
  orisa: [
    ...defaultStats,
  ],
  pharah: [
    ...defaultStats,
  ],
  reaper: [
    ...defaultStats,
  ],
  reinhardt: [
    ...defaultStats,
  ],
  roadhog: [
    ...defaultStats,
  ],
  soldier76: [
    ...defaultStats,
  ],
  sombra: [
    ...defaultStats,
  ],
  symmetra: [
    ...defaultStats,
  ],
  torbjorn: [
    ...defaultStats,
  ],
  tracer: [
    ...defaultStats,
  ],
  widowmaker: [
    KDR,
    FinalBlowPercentage,
    HeroToBarrierDamage,
    DamagePer10Mins,
    {
      label: 'Critical Scope Eliminations',
      value: (data) => {
        return (<PercentString
          value={data.heroSpecific.scopedCriticalHits / (data.combat.eliminations / 100)}
        />);
      },
    },
  ],
  winston: [
    ...defaultStats,
  ],
  zarya: [
    ...defaultStats,
  ],
  zenyatta: [
    ...defaultStats,
  ],
};

export default HERO_CARD_STATS;
