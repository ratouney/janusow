import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Row,
  Col,
} from 'antd';
import {
  GroupAccountList,
  GroupStats,
} from './';

const accountListSpan = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
};

const dataGraphSpan = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
};

class GroupProfile extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      groupname,
      groupList,
      accountData,
    } = this.props;

    const currentGroup = groupList.find((elem) => { return elem.groupname === groupname; });

    if (currentGroup === undefined) {
      return (
        <Card>
          Group not found
        </Card>
      );
    }
    return (
      <Card>
        <Row gutter={24} >
          <Col {...accountListSpan}>
            <GroupAccountList group={currentGroup} />
          </Col>
          <Col {...dataGraphSpan}>
            <GroupStats group={currentGroup} />
          </Col>
        </Row>
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

export default connect(mapStateToProps)(GroupProfile);
