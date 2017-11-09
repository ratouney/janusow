import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  Pie,
} from 'react-chartjs-2';
import {
  HERO_COLORS,
  HERO_NAMES,
} from '../../utils/consts';
import {
  QuickPlay,
  QuickPlayHeroes,
} from '../../utils/ApiParse';
import {
  playtimePercentage,
  playtimeToMinute,
} from '../../utils/ApiParse/func';
import {
  setSelectedHero,
} from './duck-reducer';

class QuickPlayPieChart extends Component {
  componentDidMount() {

  }

  render() {
    const {
      data,
      onSelectHero,
      selected,
    } = this.props;

    const QPHeroes = QuickPlayHeroes(data);

    const pieData = {
      labels:   QPHeroes.map((elem) => { return elem.hero; }),
      datasets: [{
        data: QPHeroes.map((elem) => {
          return playtimeToMinute(elem.game.timePlayed) / 60;
        }),
        backgroundColor: QPHeroes.map((elem) => { return HERO_COLORS[elem.hero]; }),
      }],
    };

    const pieOptions = {
      legend: {
        display: false,
      },
      onClick(evt, item) {
        if (!isEmpty(item)) {
          onSelectHero(QPHeroes[item[0]._index]);
        }
      },
    };

    console.log('Selected : ', selected);

    return (
      <div>
        <Pie data={pieData} options={pieOptions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.quickPlayReducer.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectHero: (index) => {
      dispatch(setSelectedHero(index));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlayPieChart);
