import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  Pie,
} from 'react-chartjs-2';
import {
  HERO_COLORS,
} from '../../utils/consts';
import {
  CompetitiveHeroes,
} from '../../utils/ApiParse';
import {
  playtimeToMinute,
} from '../../utils/ApiParse/func';
import {
  setSelectedHero,
} from './duck-reducer';

class CompetitivePieChart extends Component {
  componentDidMount() {

  }

  render() {
    const {
      data,
      onSelectHero,
    } = this.props;

    const CompHeroes = CompetitiveHeroes(data);

    const pieData = {
      labels:   CompHeroes.map((elem) => { return elem.hero; }),
      datasets: [{
        data: CompHeroes.map((elem) => {
          return playtimeToMinute(elem.game.timePlayed) / 60;
        }),
        backgroundColor: CompHeroes.map((elem) => { return HERO_COLORS[elem.hero]; }),
      }],
    };

    const pieOptions = {
      legend: {
        display: false,
      },
      onClick(evt, item) {
        if (!isEmpty(item)) {
          onSelectHero(CompHeroes[item[0]._index]);
        }
      },
    };

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

export default connect(mapStateToProps, mapDispatchToProps)(CompetitivePieChart);
