export const QuickPlay = (data) => { return data.quickPlayStats.careerStats; };
export const QuickPlayGeneral = (data) => { return data.quickPlayStats; };

export const QuickPlayHeroes = (data) => {
  return (
    Object.keys(QuickPlay(data)).filter((elem) => { return elem !== 'allHeroes'; })
  );
};

/*
const QuickPlayHeroesPlaytimeSort =
Object.keys(currentUser.quickPlayStats.careerStats)
.filter((elem) => { return elem !== 'allHeroes'; })
.map((hero) => { return { ...currentUser.quickPlayStats.careerStats[hero], hero }; })
.sort((a, b) => {
  const aPlaytime = playtimeToMinute(a.game.timePlayed);
  const bPlaytime = playtimeToMinute(b.game.timePlayed);

  if (aPlaytime < bPlaytime) { return 1; }
  if (aPlaytime > bPlaytime) { return -1; }
  return 0;
});
const QuickPlayTime = currentUser.quickPlayStats.careerStats.allHeroes.game.timePlayed;
const QuickPlayMain = QuickPlayHeroesPlaytimeSort[0]
*/
