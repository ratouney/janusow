import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserData } from './modules/SelectUser/actions';
import DB from './utils/DB/';
import './App.css';
import './theme/index.less';

class App extends Component {
  componentDidMount() {
    const {
      accountList,
      onFetchData,
    } = this.props;

    const settings = DB.get('settings')
      .value();

    if (settings.preload) {
      accountList.map((elem) => {
        return onFetchData(elem);
      });
    }
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountList: state.accountReducer.accountList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchData: (userData) => {
      dispatch(fetchUserData(userData));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
