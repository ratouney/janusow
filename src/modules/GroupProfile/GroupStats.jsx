import React, { Component } from 'react';
import { connect } from 'react-redux';
import _, { round, sum, sortBy } from 'lodash';
import {
  Card,
  Button,
  Table,
} from 'antd';
import {
  HERO_NAMES,
} from '../../utils/consts/';
import {
  Group,
  playtimeToMinute,
} from '../../utils/ApiParse/';

class GroupStats extends Component {
  componentDidMount() {
    // stuff
  }

  combinestuff(competitiveData) {
    debugger;
  }

  render() {
    const {
      group,
      accountData,
    } = this.props;

    const groupData = accountData.filter((elem) => {
      return group.keys.includes(elem.fullname);
    });

    const competitiveData = Group.combineCompetitive(Group.competitiveData(groupData));

    const columns = [
      {
        title:     'Hero',
        dataIndex: 'hero',
        width:     '120px',
      },
      {
        width:     '80px',
        title:     'Playtime',
        dataIndex: 'playtime',
        render:    (value) => {
          return (
            <span>
              {value} hours
            </span>
          );
        },
      },
    ];

    return (
      <Card
        title={`You played ${Group.competitivePlaytime(groupData)} hours this season`}
        bordered={false}
      >
        <Table dataSource={competitiveData} columns={columns} />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountData: state.accountReducer.accountData,
  };
}

export default connect(mapStateToProps)(GroupStats);
