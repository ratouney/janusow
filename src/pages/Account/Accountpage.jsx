import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import {
  Tabs,
} from 'antd';
import DashboardLayout from '../../modules/DashboardLayout';
import AccountDisplay from '../../modules/AccountPage/';
import { QuickPlayProfile } from '../../modules/QuickPlayProfile/';
import xQc from '../../utils/mock';

const { TabPane } = Tabs;

class AccountPage extends Component {
  componentDidMount() {

  }

  render() {
    const {
      match,
      location,
      userData,
    } = this.props;

    const fullname = `${match.params.id}${location.hash}`;

    // const currentUser = find(userData, { fullname });
    const currentUser = xQc;
    if (currentUser === undefined) {
      return (
        <DashboardLayout>
          User not loaded
        </DashboardLayout>
      );
    }

    console.log('User : ', currentUser);

    return (
      <DashboardLayout>
        <Tabs type="card" defaultActiveKey="2">
          <TabPane tab="General" key="1">
            General
          </TabPane>
          <TabPane tab="QuickPlay" key="2">
            <QuickPlayProfile username={currentUser.fullname} data={currentUser} />
          </TabPane>
          <TabPane tab="Competitive" key="3">
            Competitive
          </TabPane>
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

export default connect(mapStateToProps)(AccountPage);
