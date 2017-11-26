import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardLayout from '../../modules/DashboardLayout';
import AccountList from '../../modules/AccountList/';

class Homepage extends Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <DashboardLayout>
        <AccountList />
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
