import React, { Component } from 'react';
import DashboardLayout from '../../modules/DashboardLayout';
import { GroupProfile } from '../../modules/GroupProfile/';

class GroupPage extends Component {
  componentDidMount() {
    // stuff
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

export default GroupPage;
