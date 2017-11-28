import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
  Tabs,
} from 'antd';
import DashboardLayout from '../../modules/DashboardLayout';
import {
  ProgressDiag,
  fetchUserExist,
} from '../../modules/SelectUser/';
import { AccountForm } from '../../modules/AccountForm/';
import { MultiAccountForm } from '../../modules/MultiAccountForm/';

const {
  TabPane,
} = Tabs;

class SelectPage extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    const {
      onSubmit,
      searchStep,
    } = this.props;

    return (
      <DashboardLayout>
        <Tabs type="card" defaultActiveKey="2">
          <TabPane tab="Add Acount" key="1" >
            <Card title="Select your account" style={{ marginBottom: 15 }} >
              <AccountForm
                onSubmit={onSubmit}
                userData={{}}
              />
            </Card>

            {
              searchStep > 0 &&
                <Card title="Query progress" >
                  <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                    <ProgressDiag direction="horizontal" />
                  </Col>

                  <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                    <ProgressDiag direction="vertical" />
                  </Col>
                </Card>
            }
          </TabPane>
          <TabPane tab="Fuse Accounts" key="2">
            <Card title="Select your accounts" style={{ marginBottom: 15 }} >
              <MultiAccountForm />
            </Card>
          </TabPane>
        </Tabs>
      </DashboardLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchStep: state.accountReducer.searchStep,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (useless, values) => {
      dispatch(fetchUserExist(values));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPage);
