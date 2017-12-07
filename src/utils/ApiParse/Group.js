import _, { round, sum, sortBy } from 'lodash';
import { CompetitiveHeroes } from './Competitive';
import { QuickPlayHeroes } from './QuickPlay';
import { HERO_NAMES } from '../consts/global';
import { playtimeToMinute } from './func';

const Group = {
  quickplayPlaytime: (groupData) => {
    return _.sum(groupData.map((elem) => {
      return parseInt(elem.quickPlayStats.careerStats.allHeroes.game.timePlayed, 10);
    }));
  },
  competitivePlaytime: (groupData) => {
    return _.sum(groupData.map((elem) => {
      return parseInt(elem.competitiveStats.careerStats.allHeroes.game.timePlayed, 10);
    }));
  },
  quickplayData: (groupData) => {
    return groupData.map((account) => {
      return QuickPlayHeroes(account);
    });
  },
  combineQuickplay: (qpData) => {
    const heroes = HERO_NAMES.map((hero) => {
      const stats = qpData.map((account) => {
        return _.find(account, { hero });
      });

      let playtime = stats.map((hero_stats) => {
        return hero_stats ? playtimeToMinute(hero_stats.game.timePlayed) : 0;
      });
      playtime = round(sum(playtime) / 60, 2);

      return {
        hero,
        stats,
        playtime,
      };
    });

    return sortBy(heroes, 'playtime').reverse();
  },
  competitiveData: (groupData) => {
    return groupData.map((account) => {
      return CompetitiveHeroes(account);
    });
  },
  combineCompetitive: (compData) => {
    const heroes = HERO_NAMES.map((hero) => {
      const stats = compData.map((account) => {
        return _.find(account, { hero });
      });

      let playtime = stats.map((hero_stats) => {
        return hero_stats ? playtimeToMinute(hero_stats.game.timePlayed) : 0;
      });
      playtime = round(sum(playtime) / 60, 2);

      return {
        hero,
        stats,
        playtime,
      };
    });

    return sortBy(heroes, 'playtime').reverse();
  },
};

export default Group;
