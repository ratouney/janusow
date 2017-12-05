import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
} from 'antd';
import DashboardLayout from '../../modules/DashboardLayout';
import AccountList from '../../modules/AccountList/';
import GroupList from '../../modules/GroupList/';

const { TabPane } = Tabs;

class Homepage extends Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <DashboardLayout>
        <Tabs type="card" defaultActiveKey="2">
          <TabPane tab="Accounts" key="1">
            <AccountList />
          </TabPane >
          <TabPane tab="Groups" key="2">
            <GroupList />
          </TabPane >
        </Tabs>
      </DashboardLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.accountReducer.accountData,
  };
}

export default connect(mapStateToProps)(Homepage);
