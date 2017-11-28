import React from 'react';
import { get, round } from 'lodash';
import { Table } from 'antd';
import {
  playtimeToMinute,
} from '../../utils/ApiParse/func';
import { HERO_IMPORTANT_STATS } from '../../utils/consts';

const QuickPlayStats = (props) => {
  const {
    currentSelected,
    currentHero,
  } = props;

  const columns = [
    {
      title:     'Stat name',
      dataIndex: 'key',
      width:     '130px',
      key:       'key',
    },
    {
      title:     'Stat Value',
      dataIndex: 'value',
      width:     '70px',
      key:       'value',
    },
  ];

  const dataSource = [
    {
      key:   'Time Played',
      value: `${playtimeToMinute(currentSelected.game.timePlayed) / 60} hours`,
    },
    {
      key:   'Average damage per 10 mins',
      value: round(currentSelected.average.allDamageDone * 600, 1),
    },
    ...HERO_IMPORTANT_STATS[currentHero].map((elem) => {
      return {
        key:   elem.name,
        value: (elem.render ? elem.render(currentSelected) : get(currentSelected, elem.key)),
      };
    }),
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} showHeader={false} footer={null} pagination={false} />
    </div>
  );
};

export default QuickPlayStats;
