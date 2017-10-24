import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountDisplay extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    const {
      id,
    } = this.props;

    return (
      <div>
        Displaying account stuff for : {id}
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
