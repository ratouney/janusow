import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardLayout from '../../modules/DashboardLayout';
import { GroupProfile } from '../../modules/GroupProfile/';

class GroupPage extends Component {
  componentWillReceiveProps({ success }) {
    const { success: prevSuccess } = this.props;

    debugger;
    if (success && success !== prevSuccess) {
      console.log('successfully created');
      // message.success
    }
  }

  render() {
    const {
      match: { params: { groupname } },
    } = this.props;

    return (
      <DashboardLayout>
        <GroupProfile groupname={groupname} />
      </DashboardLayout>
    );
  }
}

function mapStateToProps({
  groupReducer: { success },
}) {
  return {
    success,
  };
}

export default connect(mapStateToProps)(GroupPage);
