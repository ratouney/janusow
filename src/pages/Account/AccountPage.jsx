import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import {
  Tabs,
  Card,
} from 'antd';
import DashboardLayout from '../../modules/DashboardLayout';
import { QuickPlayProfile } from '../../modules/QuickPlayProfile/';
import { CompetitiveProfile } from '../../modules/CompetitiveProfile/';
import { GeneralProfile } from '../../modules/GeneralProfile/';
// import xQc from '../../utils/mock';

const { TabPane } = Tabs;

class AccountPage extends Component {
  componentDidMount() {

  }

  render() {
    const {
      match,
      userData,
    } = this.props;

    const fullname = `${match.params.username}#${match.params.battletag}`;

    const currentUser = find(userData, { fullname });
    // const currentUser = xQc;
    if (currentUser === undefined) {
      return (
        <DashboardLayout>
          <Card>
            User not loaded
          </Card>
        </DashboardLayout>
      );
    }


    return (
      <DashboardLayout>
        <Tabs type="card" defaultActiveKey="3">
          <TabPane tab="General" key="1">
            <GeneralProfile username={currentUser.fullname || fullname} data={currentUser} />
          </TabPane>
          <TabPane tab="QuickPlay" key="2">
            <QuickPlayProfile username={currentUser.fullname || fullname} data={currentUser} />
          </TabPane>
          <TabPane tab="Competitive" key="3">
            <CompetitiveProfile username={currentUser.fullname || fullname} data={currentUser} />
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
