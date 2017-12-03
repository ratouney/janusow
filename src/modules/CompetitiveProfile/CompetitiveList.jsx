import React, { Component } from 'react';
import { capitalize } from 'lodash';
import {
  Table,
  Avatar,
} from 'antd';
import { connect } from 'react-redux';
import {
  HERO_COLORS,
  HERO_TEXT_COLORS,
  HERO_ICONS,
} from '../../utils/consts';
import {
  CompetitiveHeroes,
} from '../../utils/ApiParse';
import {
  setSelectedHero,
} from './duck-reducer';
import getHeroColors from '../../utils/getHeroColors';

const heroColors = getHeroColors(document);

const columns = [
  {
    title:     '',
    dataIndex: 'heroIcon',
    width:     '40px',
    key:       'heroIcon',
    render:    (value) => {
      return (
        <span
          className="profile-list-avatar"
        >
          <Avatar
            shape="square"
            src={value}
            size="large"
          />
        </span>
      );
    },
  },
  {
    title:     'Hero Name',
    dataIndex: 'hero',
    key:       'hero',
    render:    (value, item) => {
      return (
        <div
          className={`table-label-font ${item.className}`}
          // style={{ backgroundColor: item.backgroundColor, color: item.textColor }}
        >
          {capitalize(value)}
        </div>
      );
    },
  },
  {
    title:     'Playtime',
    width:     '60px',
    dataIndex: 'playtime',
    key:       'playtime',
  },
];

class CompetitiveList extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      data,
      onSelectHero,
    } = this.props;

    const QPHeroes = CompetitiveHeroes(data);

    const tableData = QPHeroes.map((elem) => {
      return {
        ...elem,
        className:       `${elem.hero}Color`,
        backgroundColor: heroColors[elem.hero].backgroundColor,
        textColor:       heroColors[elem.hero].color,
        heroIcon:        HERO_ICONS[elem.hero],
        playtime:        elem.game.timePlayed,
      };
    });

    console.log('CompL : ', data);
    console.log('TableData : ', tableData);

    return (
      <Table
        showHeader={false}
        footer={null}
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={tableData}
        size="small"
        onRowClick={(row) => { return onSelectHero(row); }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.quickPlayReducer.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectHero: (index) => {
      dispatch(setSelectedHero(index));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitiveList);
