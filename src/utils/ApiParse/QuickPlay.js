import _ from 'lodash';
import {
  playtimeToMinute,
} from './func';

export const QuickPlay = (data) => { return data.quickPlayStats.careerStats; };
export const QuickPlayGeneral = (data) => { return data.quickPlayStats; };

export const QuickPlayHeroes = (data) => {
  return (
    Object.keys(QuickPlay(data))
      .filter((elem) => { return elem !== 'allHeroes'; })
      .map((hero) => { return { ...data.quickPlayStats.careerStats[hero], hero }; })
      .sort((a, b) => {
        const aPlaytime = playtimeToMinute(a.game.timePlayed);
        const bPlaytime = playtimeToMinute(b.game.timePlayed);

        if (aPlaytime < bPlaytime) { return 1; }
        if (aPlaytime > bPlaytime) { return -1; }
        return 0;
      })
  );
};

export const QuickPlayHero = (data, hero) => {
  return _.find(QuickPlayHeroes(data), { hero });
};

export const QuickPlayMainHero = (data) => {
  return (
    QuickPlayHeroes(data)[0].hero
  );
};

export const QuickPlayHeroPlaytime = (data, hero) => {
  return QuickPlayHero(data, hero).game.timePlayed;
};

export const QuickPlayFullTime = (data) => {
  return QuickPlay(data).allHeroes.game.timePlayed;
};

export const QuickPlayHeroPercentage = (data, hero) => {
  const HeroPL = QuickPlayHeroPlaytime(data, hero);
  const FullPL = QuickPlayFullTime(data);

  return playtimeToMinute(HeroPL) / (playtimeToMinute(FullPL) / 100);
};
