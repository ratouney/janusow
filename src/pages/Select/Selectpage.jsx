import React, { Component } from 'react';
import DashboardLayout from '../../modules/DashboardLayout';
import { SelectUser } from '../../modules/SelectUser/';

class SelectPage extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    return (
      <DashboardLayout>
        <SelectUser />
      </DashboardLayout>
    );
  }
}

export default SelectPage;
