import _ from 'lodash';

const getHeroColors = (document) => {
  const heroColors = {};
  _.each(document.styleSheets, (elem) => {
    _.each(elem.rules, (rule) => {
      const reg = /\.(.+)Color/g.exec(rule.selectorText);
      if (reg) {
        heroColors[reg[1]] = {
          backgroundColor: rule.style.backgroundColor,
          color:           rule.style.color,
        };
      }
    });
  });

  return heroColors;
};

export default getHeroColors;
