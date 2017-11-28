import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
} from 'antd';
import { capitalize } from 'lodash';
import { QuickPlayHeroes, CompetitiveHeroes } from '../../utils/ApiParse/';

const LevelTag = ({ level, prestige, rank }) => {
  return (
    <div style={{
      width:       '250px',
      height:      '350px',
      marginRight: 12,
    }}
    >
      <img src={level} alt="Unleveled" />
      <img
        src={rank}
        alt="Unleveled"
        style={{
          position: 'relative',
          top:      -100,
          left:     89,
          width:    '32%',
          height:   '27%',
        }}
      />
      <img
        src={prestige}
        alt="Unleveled"
        style={{
          position: 'relative',
          top:      -195,
        }}
      />
    </div>
  );
};

const levelSpan = {
  xs: 24,
  sm: 24,
  md: 8,
  lg: 8,
  xl: 4,
};

const statsSpan = {
  xs: 24,
  sm: 24,
  md: 16,
  lg: 16,
  xl: 20,
};

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

class GeneralProfile extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      data,
      username,
    } = this.props;


    const qpHeroes = QuickPlayHeroes(data);
    const compHeroes = CompetitiveHeroes(data);

    console.log('Data : ', data, qpHeroes, compHeroes);

    const dataSource = [
      {
        key:   'Rating',
        value: data.rating,
      },
      {
        key:   'QuickPlay Time',
        value: data.quickPlayStats.careerStats.allHeroes.game.timePlayed,
      },
      {
        key:   'QuickPlay Main',
        value: `${capitalize(qpHeroes[0].hero)}`,
        // value: `${capitalize(qpHeroes[0].hero)} - ${qpHeroes[0].game.timePlayed}`,
      },
      {
        key:   'Competitive Time',
        value: data.competitiveStats.careerStats.allHeroes.game.timePlayed,
      },
      {
        key:   'Competitive Main',
        value: `${capitalize(compHeroes[0].hero)}`,
        // value: `${capitalize(compHeroes[0].hero)} - ${compHeroes[0].game.timePlayed}`,
      },
    ];

    return (
      <Card title={<h2>{username}</h2>} bordered={false}>
        <Row gutter={8}>
          <Col {...levelSpan}>
            <LevelTag
              level={data.levelIcon}
              rank={data.ratingIcon}
              prestige={data.prestigeIcon}
            />
          </Col>
          <Col {...statsSpan}>
            <Table dataSource={dataSource} columns={columns} showHeader={false} footer={null} pagination={false} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default GeneralProfile;
