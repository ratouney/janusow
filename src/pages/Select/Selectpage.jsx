import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
} from 'antd';
import DashboardLayout from '../../modules/DashboardLayout';
import {
  ProgressDiag,
  fetchUserExist,
} from '../../modules/SelectUser/';
import { AccountForm } from '../../modules/AccountForm/';

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
        <Row>
          <Card title="Select your account" style={{ marginBottom: 15 }} >
            <AccountForm
              onSubmit={onSubmit}
              userData={{}}
            />
          </Card>

          {
            searchStep > 0 ?
              <Card title="Query progress" >
                <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                  <ProgressDiag direction="horizontal" />
                </Col>

                <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                  <ProgressDiag direction="vertical" />
                </Col>
              </Card>
              : ''
          }
        </Row>
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
