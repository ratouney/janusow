import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountList extends Component {
  componentDidMount() {

  }

  render() {
    const {
      accountList,
    } = this.props;

    return (
      <div>
        {JSON.stringify(accountList)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountList: state.accountReducer.accountList,
  };
}

export default connect(mapStateToProps)(AccountList);
