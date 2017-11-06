import React, { Component } from 'react';
import {
  Card,
  Progress,
} from 'antd';
import {
  Pie,
} from 'react-chartjs-2';
import { connect } from 'react-redux';
import _, { isEmpty, find }  from 'lodash';
import {
  QuickPlay,
  QuickPlayGeneral,
  QuickPlayHeroes,
  QuickPlayHero,
  QuickPlayHeroPlaytime,
  QuickPlayFullTime,
  QuickPlayHeroPercentage,
} from '../../utils/ApiParse/QuickPlay';
import {
  HERO_COLORS,
  HERO_NAMES,
} from '../../utils/consts';
import {
  playtimeToMinute,
} from '../../utils/ApiParse/func';

const data = {
  datasets: [{
    data:            [5, 6, 8, 4, 4, 5, 8, 8, 5, 2, 2],
    backgroundColor: HERO_COLORS,
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: HERO_NAMES,
};

class AccountDisplay extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    const {
      id,
      userData,
    } = this.props;

    if (isEmpty(userData) || find(userData, { fullname: id }) === undefined) {
      return (
        <div>
          User not loaded
        </div>
      );
    }

    const currentUser = _.find(userData, { fullname: id });
    const QPHeroes = QuickPlayHeroes(currentUser);

    const pieData =  {
      labels:   QPHeroes.map((elem) => { return elem.hero; }),
      datasets: [{
        data: QPHeroes.map((elem) => {
          return playtimeToMinute(elem.game.timePlayed) / 60;
        }),
        backgroundColor: QPHeroes.map((elem) => { return HERO_COLORS[elem.hero]; }),
      }],
    };

    const pieOption = {
      onClick(evt, item, more) {
        console.log('Item : ', QPHeroes[item[0]._index]);
      },
    };

    return (
      <div>
        Displaying account stuff for : {id}
        <Pie data={pieData} options={pieOption} />
        <br />
        {
          QPHeroes.map((elem) => {
            return (
              <Card key={elem.hero} title={elem.hero}>
                {elem.hero} playtime : {QuickPlayHeroPercentage(currentUser, elem.hero)}
                <Progress
                  percent={QuickPlayHeroPercentage(currentUser, elem.hero)}
                  className={elem.hero}
                />
              </Card>
            );
          })
        }
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
