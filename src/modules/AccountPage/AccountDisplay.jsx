import React, { Component } from 'react';
import {
  Card,
} from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MainHeroCard } from '../HeroCards/';

function playtimeToMinute(timeAsString) {
  const time = timeAsString.split(' ');

  if (time[1] === 'minutes') {
    return time[0];
  }
  return time[0] * 60;
}

function playtimePercentage(total, curr) {
  return playtimeToMinute(curr) / (playtimeToMinute(total) / 100);
}

class AccountDisplay extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    const {
      id,
      userData,
    } = this.props;

    if (!userData || userData.length === 0) {
      return (
        <div>
          User not loaded
        </div>
      );
    }

    const currentUser = _.find(userData, { fullname: id });

    return (
      <div>
        Displaying account stuff for : {id}

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
