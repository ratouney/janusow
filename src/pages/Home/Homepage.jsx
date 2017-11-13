import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardLayout from '../../modules/DashboardLayout';
import AccountList from '../../modules/AccountList/';
import { AccountForm } from '../../modules/AccountForm/';
import DB from '../../utils/DB/';

class Homepage extends Component {
  componentDidMount() {
    //
  }

  render() {
    const hasUsers =
      DB.get('users')
        .size()
        .value();

    console.log('Has users : ', hasUsers);
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
