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
    <div
      className="account-tag"
    >
      <img
        className="account-tag-level"
        src={level}
        alt="Unleveled"
      />
      <img
        className="account-tag-rank"
        src={rank}
        alt=""
      />
      <img
        className="account-tag-prestige"
        src={prestige}
        alt=""
      />
    </div>
  );
};

const levelSpan = {
  xs: 24,
  sm: 24,
  md: 10,
  lg: 8,
  xl: 4,
};

const statsSpan = {
  xs: 24,
  sm: 24,
  md: 14,
  lg: 16,
  xl: 20,
};

const columns = [
  {
    title:     'Stat name',
    dataIndex: 'key',
    width:     '130px',
    key:       'key',
    render:    (value) => {
      return (
        <span className="general-profile-table-label">
          {value}
        </span>);
    },
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

    let compHeroes;
    const hasPlayedCompetitive = data.competitiveStats.careerStats !== undefined;

    const qpHeroes = QuickPlayHeroes(data);
    if (hasPlayedCompetitive) {
      compHeroes = CompetitiveHeroes(data);
    }

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
        value: hasPlayedCompetitive ? data.competitiveStats.careerStats.allHeroes.game.timePlayed : 'Did not play Comp',
      },
      {
        key:   'Competitive Main',
        value: hasPlayedCompetitive ? `${capitalize(compHeroes[0].hero)}` : 'Did not play Comp',
        // value: `${capitalize(compHeroes[0].hero)} - ${compHeroes[0].game.timePlayed}`,
      },
    ];

    return (
      <Card title={<h2>{username}</h2>} bordered={false}>
        <Row gutter={8} type="flex" justify="center" align="middle">
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
