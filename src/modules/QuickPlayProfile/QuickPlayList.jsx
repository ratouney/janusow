import React, { Component } from 'react';
import { capitalize } from 'lodash';
import {
  Table,
} from 'antd';
import { connect } from 'react-redux';
import {
  HERO_COLORS,
  HERO_TEXT_COLORS,
} from '../../utils/consts';
import {
  QuickPlayHeroes,
} from '../../utils/ApiParse';
import {
  setSelectedHero,
} from './duck-reducer';

const columns = [
  {
    title:     'Hero Name',
    width:     '110px',
    dataIndex: 'hero',
    key:       'hero',
    render:    (value, item) => {
      return (
        <div style={{ backgroundColor: item.backgroundColor, color: item.textColor }} >
          {capitalize(value)}
        </div>
      );
    },
  },
  {
    title:     'Playtime',
    dataIndex: 'playtime',
    width:     '90px',
    key:       'playtime',
  },
];

class QuickPlayList extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      data,
      onSelectHero,
    } = this.props;

    const QPHeroes = QuickPlayHeroes(data);

    const tableData = QPHeroes.map((elem) => {
      return {
        ...elem,
        backgroundColor: HERO_COLORS[elem.hero],
        textColor:       HERO_TEXT_COLORS[elem.hero],
        playtime:        elem.game.timePlayed,
      };
    });

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

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlayList);
