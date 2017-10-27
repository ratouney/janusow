import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import { fetchUserData } from '../SelectUser';

class AccountList extends Component {
  componentDidMount() {

  }

  render() {
    const {
      accountList,
      onRequestData,
    } = this.props;

    return (
      <div>
        {accountList.map((elem) => {
          console.log('AccountList : ', elem);
          return (
            <Card key={`${elem.username}#${elem.battletag}`} title={`${elem.username}#${elem.battletag}`}>
              {
                !elem.loaded
                  ? <Button onClick={() => { onRequestData({ ...elem }); }}>
                  Fetch Data
                  </Button>
                  : 'Data fetched'
              }
            </Card>
          );
        })}
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
    onRequestData: (userData) => {
      dispatch(fetchUserData(userData));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
