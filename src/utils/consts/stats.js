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
      // divide by the number of total blades for a kill/blade count
      // 'heroSpecific.dragonblades'
    },
    {
      key:    '',
      name:   'Reflected damage',
      render: (specs) => {
        return `${round(specs.heroSpecific.damageReflected / (specs.combat.damageDone / 100), 1)} %`;
      },
      // divide by total damage for a ratio
    },
  ],
  hanzo:   [],
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
      // Divide it with the critical hits for a HSKill ratio
    },
  ],
  mei:   [],
  mercy: [
    {
      key:    '',
      name:   'Healing Done',
      render: (specs) => {
        const playtime = (playtimeToMinute(specs.game.timePlayed) * 60) - (specs.deaths.deaths * 10);
        const healed = specs.miscellaneous.healingDone;
        return `${round(healed / ((playtime * 60) / 100), 2)} %`;
      },
      // divide per time played to see the percentage of time spent healing
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
      // create a ratio with the damage blocked 'heroSpecific.damageBlocked'
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
      // divide the total elims with this to obtain a percentage
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
  widowmaker: [],
  winston:    [
    {
      key:  'Total Kills',
      name: 'combat.eliminations',
      // merge 'heroSpecific.jumpPackKills' and 'heroSpecific.meleeKills' to create a ratio
    },
  ],
  zarya: [
    {
      key:  'heroSpecific.projectedBarriersApplied',
      name: 'Barrier Usage',
      // divide 'heroSpecific.damageBlocked' by this to have the real barrier usage
    },
  ],
  zenyatta: [],
};

export default HERO_IMPORTANT_STATS;
