import _ from 'lodash';
import {
  playtimeToMinute,
} from './func';

export const Competitive = (data) => { return data.competitiveStats.careerStats; };
export const CompetitiveGeneral = (data) => { return data.competitiveStats; };

export const CompetitiveHeroes = (data) => {
  return (
    Object.keys(Competitive(data))
      .filter((elem) => { return elem !== 'allHeroes'; })
      .map((hero) => { return { ...data.competitiveStats.careerStats[hero], hero }; })
      .sort((a, b) => {
        const aPlaytime = playtimeToMinute(a.game.timePlayed);
        const bPlaytime = playtimeToMinute(b.game.timePlayed);

        if (aPlaytime < bPlaytime) { return 1; }
        if (aPlaytime > bPlaytime) { return -1; }
        return 0;
      })
  );
};

export const CompetitiveHero = (data, hero) => {
  return _.find(CompetitiveHeroes(data), { hero });
};

export const CompetitiveMainHero = (data) => {
  return (
    CompetitiveHeroes(data)[0].hero
  );
};

export const CompetitiveHeroPlaytime = (data, hero) => {
  return CompetitiveHero(data, hero).game.timePlayed;
};

export const CompetitiveFullTime = (data) => {
  return Competitive(data).allHeroes.game.timePlayed;
};

export const CompetitiveHeroPercentage = (data, hero) => {
  const HeroPL = CompetitiveHeroPlaytime(data, hero);
  const FullPL = CompetitiveFullTime(data);

  return playtimeToMinute(HeroPL) / (playtimeToMinute(FullPL) / 100);
};
