import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import {
  Tabs,
  Card,
  Button,
} from 'antd';
import DashboardLayout from '../../modules/DashboardLayout';
import AccountDisplay from '../../modules/AccountPage/';
import { QuickPlayProfile } from '../../modules/QuickPlayProfile/';
import { fetchUserData } from '../../modules/SelectUser/actions';
import xQc from '../../utils/mock';

const { TabPane } = Tabs;

class AccountPage extends Component {
  componentDidMount() {

  }

  render() {
    const {
      match,
      accountData,
      accountList,
      onFetchUser,
      isFetchingData,
    } = this.props;

    const fullname = `${match.params.username}#${match.params.battletag}`;

    const accountConfig = find(accountList, { username: match.params.username, battletag: match.params.battletag });
    const currentUser = find(accountData, { fullname });
    // const currentUser = xQc;

    if (accountConfig === undefined) {
      return (
        <DashboardLayout>
          User doesnt exist in AccountList
        </DashboardLayout>
      );
    }

    if (currentUser === undefined) {
      return (
        <DashboardLayout>
          <Card
            title={`${fullname} is not loaded`}
            loading
            extra={<Button
              loading={isFetchingData}
              onClick={() => { return onFetchUser(accountConfig); }}
            >
              Load User
                   </Button>}
          />
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
            <QuickPlayProfile username={currentUser.fullname || fullname} data={currentUser} />
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
    accountData:    state.accountReducer.accountData,
    accountList:    state.accountReducer.accountList,
    isFetchingData: state.accountReducer.isFetchingData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchUser: (userData) => {
      dispatch(fetchUserData(userData));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
