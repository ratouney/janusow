import { round } from 'lodash';
import { playtimeToMinute } from '../ApiParse/func';

const HERO_IMPORTANT_STATS = {
  ana: [
    {
      key:  'heroSpecific.scopedAccuracy',
      name: 'Scoped Accuracy',
    },
  ],
  bastion:  [],
  doomfist: [],
  dVa:      [],
  genji:    [
    {
      key:    'heroSpecific',
      name:   'Dragonblade Kills per blade',
      render: (specs) => { return round(specs.heroSpecific.dragonblades / specs.heroSpecific.dragonbladeKills, 1); },
    },
    {
      key:    '',
      name:   'Reflected damage',
      render: (specs) => {
        return `${round(specs.heroSpecific.damageReflected / (specs.combat.damageDone / 100), 1)} %`;
      },
    },
  ],
  hanzo: [
    {
      key:    'heroSpecific.scatterArrowKills',
      name:   'Scatter kills',
      render: (specs) => {
        return `${round(specs.heroSpecific.scatterArrowKills / (specs.combat.eliminations / 100), 1)} %`;
      },
    },
  ],
  junkrat: [],
  lucio:   [],
  mccree:  [
    {
      key:  'combat.weaponAccuracy',
      name: 'Accuracy',
    },
    {
      key:    'combat.eliminations',
      name:   'Eliminations to Crits Ratio',
      render: (specs) => { return round(specs.combat.eliminations / specs.combat.criticalHits, 2); },
    },
  ],
  mei:   [],
  mercy: [
    {
      key:    '',
      name:   'Time spent healing',
      render: (specs) => {
        const playtime = (playtimeToMinute(specs.game.timePlayed) * 60) - (specs.deaths.deaths * 10);
        const healed = specs.miscellaneous.healingDone;
        return `${round(healed / ((playtime * 60) / 100), 2)} %`;
      },
    },
  ],
  orisa:  [],
  pharah: [
    {
      key:  'combat.eliminationsPerLife',
      name: 'Average KD',
    },
  ],
  reaper: [
    {
      key:  'combat.eliminationsPerLife',
      name: 'Average KD',
    },
  ],
  reinhardt: [
    {
      key:    '',
      name:   'Blocked to Damage ratio',
      render: (specs) => { return round(specs.heroSpecific.damageBlocked / specs.combat.damageDone, 1); },
    },
  ],
  roadhog: [
    {
      key:  'heroSpecific.hookAccuracy',
      name: 'Hook Accuracy',
    },
  ],
  soldier76: [
    {
      key:  'combat.weaponAccuracy',
      name: 'Accuracy',
    },
    {
      key:    'heroSpecific.helixRocketsKills',
      name:   'Helix Takedowns',
      render: (specs) => {
        return `${round(specs.heroSpecific.helixRocketsKills / (specs.combat.eliminations / 100), 1)} %`;
      },
    },
  ],
  sombra:   [],
  symmetra: [],
  torbjorn: [],
  tracer:   [
    {
      key:  'combat.weaponAccuracy',
      name: 'Accuracy',
    },
  ],
  widowmaker: [
    {
      key:    '',
      name:   'Bodyshot/Headshot kills ratio',
      render: (specs) => {
        return `${round(specs.heroSpecific.scopedCriticalHits / (specs.combat.eliminations / 100), 1)} %`;
      },
    },
  ],
  winston: [
    {
      key:    '',
      name:   'Jumpack and melee kills ratio',
      render: (specs) => {
        return `${round((specs.heroSpecific.jumpPackKills + specs.heroSpecific.meleeKills) / (specs.combat.eliminations / 100), 1)} %`;
      },
    },
  ],
  zarya: [
    {
      key:    'heroSpecific.projectedBarriersApplied',
      name:   'Damage blocked per barrier',
      render: (specs) => {
        return round(specs.heroSpecific.damageBlocked / specs.heroSpecific.projectedBarriersApplied, 1);
      },
    },
  ],
  zenyatta: [
    {
      key:    '',
      name:   'Healing/Damage ratio',
      render: (specs) => {
        return round(specs.combat.damageDone / specs.miscellaneous.healingDone, 1);
      },
    },
  ],
};

export default HERO_IMPORTANT_STATS;
