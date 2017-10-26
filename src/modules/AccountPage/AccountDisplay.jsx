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
    const QuickPlayHeroesPlaytimeSort = Object.keys(currentUser.quickPlayStats.careerStats).filter((elem) => { return elem !== 'allHeroes'; }).map((hero) => { return { ...currentUser.quickPlayStats.careerStats[hero], hero }; }).sort((a, b) => {
      const aPlaytime = playtimeToMinute(a.game.timePlayed);
      const bPlaytime = playtimeToMinute(b.game.timePlayed);

      if (aPlaytime < bPlaytime) { return 1; }
      if (aPlaytime > bPlaytime) { return -1; }
      return 0;
    });
    const QuickPlayTime = currentUser.quickPlayStats.careerStats.allHeroes.game.timePlayed;
    const QuickPlayMain = QuickPlayHeroesPlaytimeSort[0];
    // const QuickPlayMainPercentage = QuickPlayMain.

    console.log('UserData : ', userData);
    console.log('CurrentUser : ', currentUser);
    console.log('QPTIME : ', QuickPlayHeroesPlaytimeSort);


    return (
      <div>
        Displaying account stuff for : {id}

        <MainHeroCard
          heroName={QuickPlayMain.hero}
        />
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
