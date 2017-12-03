import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, round } from 'lodash';
import {
  Pie,
} from 'react-chartjs-2';
import {
  CompetitiveHeroes,
} from '../../utils/ApiParse';
import {
  playtimeToMinute,
} from '../../utils/ApiParse/func';
import {
  setSelectedHero,
} from './duck-reducer';
import getHeroColors from '../../utils/getHeroColors';

const heroColors = getHeroColors(document);

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
          return round(playtimeToMinute(elem.game.timePlayed) / 60, 2);
        }),
        backgroundColor: CompHeroes.map((elem) => { return heroColors[elem.hero].backgroundColor; }),
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
      <div
        className="pie-chart"
      >
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
