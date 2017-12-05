import React, { Component } from 'react';
import { find } from 'lodash';
import { connect } from 'react-redux';
import {
  Card,
  Table,
  Button,
} from 'antd';
import { fetchUserData } from '../SelectUser/';

class GroupAccountList extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      accountData,
      group,
      onFetchUserData,
    } = this.props;

    const accountsFetched = group.children.map((elem) => {
      const found = find(accountData, { fullname: elem.key });

      return {
        ...elem,
        fullname: elem.key,
        fetched:  !(found === undefined),
      };
    });

    const columns = [
      {
        title:     'Account',
        dataIndex: 'fullname',
      },
      {
        title:      'Status',
        dataiIndex: 'fetched',
        render:     (item, value) => {
          if (value.fetched === true) {
            return (
              <span style={{ color: 'green' }} >
                Fetched
              </span>
            );
          }

          const {
            region,
            platform,
            username,
            battletag,
          } = item;

          return (
            <Button
              onClick={() => {
                onFetchUserData({
                  region, platform, username, battletag,
                });
              }}
            >
                Fetch data
            </Button>
          );
        },
      },
    ];

    return (
      <Card bordered={false}>
        <Table columns={columns} dataSource={accountsFetched} />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountData: state.accountReducer.accountData,
    groupList:   state.groupReducer.groupList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchUserData: (userData) => {
      dispatch(fetchUserData(userData));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAccountList);
