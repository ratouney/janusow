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
  QuickPlayHeroes,
} from '../../utils/ApiParse';
import {
  setSelectedHero,
} from './duck-reducer';

const columns = [
  {
    title:     '',
    dataIndex: 'heroIcon',
    width:     '40px',
    key:       'heroIcon',
    render:    (value) => {
      console.log('Value : ', value);
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
          className={`quickplay-profile-table-label ${item.className}`}
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
        className:       `${elem.hero}Color`,
        backgroundColor: HERO_COLORS[elem.hero],
        textColor:       HERO_TEXT_COLORS[elem.hero],
        heroIcon:        HERO_ICONS[elem.hero],
        playtime:        elem.game.timePlayed
          .replace(/hours|minutes|seconds/gi, (x) => {
            switch (x) {
              case 'hours':
                return 'h';
              case 'minutes':
                return 'min';
              case 'seconds':
                return 'secs';
              default:
                return x;
            }
          }),
      };
    });

    return (
      <Table
        className="quickplay-list-table"
        scroll={{ x: '280px' }}
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
