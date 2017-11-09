import React from 'react';
import { Table, Tag } from 'antd';
import {
  playtimeToMinute,
} from '../../utils/ApiParse/func';
import { HERO_IMPORTANT_STATS } from '../../utils/consts';

const QuickPlayStats = (props) => {
  const {
    currentSelected,
    currentColor,
    currentHero,
  } = props;

  const columns = [
    {
      title:     'Stat name',
      dataIndex: 'key',
      key:       'key',
    },
    {
      title:     'Stat Value',
      dataIndex: 'value',
      key:       'value',
    },
  ];

  const dataSource = [
    {
      key:   'Time Played',
      value: `${playtimeToMinute(currentSelected.game.timePlayed) / 60} hours`,
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} showHeader={false} footer={null} pagination={false} />
    </div>
  );
};

export default QuickPlayStats;
