import React from 'react';
import {
  Card,
} from 'antd';
import { capitalize } from 'lodash';

const MainHeroCard = (props) => {
  const {
    heroName,
    playtime,
    totalPlaytime,
    statName,
    statValue,
  } = props;

  return (
    <Card title={capitalize(heroName)} >
      Infos here
    </Card>
  );
};

export default MainHeroCard;
