import React, { Component } from 'react';
import _, { sum, round } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  Table,
  Button,
  Avatar,
} from 'antd';

const getDataSource = (groups, accountData) => {
  const initGroups = groups.map((elem) => {
    return {
      key:      elem.groupname,
      name:     elem.groupname,
      main:     elem.main,
      size:     elem.children.length,
      children: elem.children.map((acc) => {
        const current = _.find(accountData, { fullname: acc.key });

        console.log('Current : ', current);
        return {
          ...acc,
          key:        `${elem.groupname}|${acc.key}`,
          name:       acc.key,
          rating:     current ? parseInt(current.rating, 10) : 0,
          totalLevel: current ? current.level + (current.prestige * 100) : 0,
        };
      }),
    };
  });

  return initGroups.map((group) => {
    const groupRatings = group.children
      .map((account) => { return account.rating; })
      .filter((value) => { return value !== 0; });

    const totalLevel = sum(group.children.map((account) => { return account.totalLevel; }));
    const averageRating = round(sum(groupRatings) / groupRatings.length, 0);

    return {
      ...group,
      rating: averageRating,
      totalLevel,
    };
  });
};

class GroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: props.groupList,
    };
  }

  render() {
    const {
      groups = [],
    } = this.state;

    const {
      accountData,
    } = this.props;

    const dataSource = getDataSource(groups, accountData);

    const colums = [
      {
        title:     'Name',
        dataIndex: 'name',
        width:     '160px',
        render:    (value, item) => {
          if (item.children) {
            return (
              <Link to={`/group/${value}`} >
                {value}
              </Link>
            );
          }
          return (
            <Link to={`/account/${item.username}-${item.battletag}`} >
              {value}
            </Link>
          );
        },
      },
      {
        title:     'Accounts',
        dataIndex: 'size',
        width:     '70px',
      },
      {
        width:     '70px',
        title:     'Rating',
        dataIndex: 'rating',
      },
      {
        width:     '70px',
        title:     'Level',
        dataIndex: 'totalLevel',
      },
    ];

    console.log('RENDERING');

    return (
      <Card>
        <Table
          dataSource={dataSource}
          columns={colums}
          scroll={{ x: 420 }}
        />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupList:   state.groupReducer.groupList,
    accountData: state.accountReducer.accountData,
  };
}

export default connect(mapStateToProps)(GroupList);
