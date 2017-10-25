import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class AccountDisplay extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    const {
      id,
      userData,
    } = this.props;

    const currentUser = _.find(userData, { fullname: id });

    console.log('UserData : ', userData);
    console.log('CurrentUser : ', currentUser);

    return (
      <div>
        Displaying account stuff for : {id}

        <br />
        <br />
        {JSON.stringify(currentUser)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.accountReducer.accountData,
  };
}

export default connect(mapStateToProps)(AccountDisplay);
