import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, capitalize } from 'lodash';
import {
  Card,
  Switch,
  Row,
  Col,
} from 'antd';
import {
  QuickPlayHeroes,
} from '../../utils/ApiParse';
import {
  HERO_ICONS,
  HERO_COLORS,
} from '../../utils/consts';
import QuickPlayPieChart from './QuickPlayPieChart';
import QuickPlayStats from './QuickPlayStats';
import QuickPlayList from './QuickPlayList';
import QuickPlayModal from './QuickPlayModal';
import { openModal } from './duck-reducer';

class QuickPlayProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPiechart: false,
    };
  }

  handleChange() {
    this.setState({
      showPiechart: !this.state.showPiechart,
    });
  }

  render() {
    const {
      data,
      username,
      showModal,
      selected,
      onShowModal,
    } = this.props;

    const {
      showPiechart,
    } = this.state;

    const QPHeroes = QuickPlayHeroes(data);

    const currentSelected = isEmpty(selected) ? QPHeroes[0] : selected;
    const currentColor = HERO_COLORS[currentSelected.hero];
    const currentHero = currentSelected.hero;

    const pieChartSpan = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 10,
      xl: 10,
    };

    const heroCardSpan = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 14,
      xl: 14,
    };

    const heroImageSpan = {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 6,
    };

    const heroStatSpan = {
      xs: 24,
      sm: 12,
      md: 16,
      lg: 16,
      xl: 18,
    };

    return (
      <Card title={<h2>{username}</h2>} bordered={false}>
        <Row gutter={24}>
          <Col {...pieChartSpan}>
            <Card
              title="Total hours"
              bordered={false}
              extra={
                <Switch
                  checkedChildren="List"
                  unCheckedChildren="Chart"
                  defaultChecked={!showPiechart}
                  size="small"
                  onChange={() => { return this.handleChange(); }}
                />}
            >
              {
                showPiechart
                  ? <QuickPlayPieChart data={data} />
                  : <QuickPlayList data={data} />
              }
            </Card>
          </Col>

          {showModal && <QuickPlayModal selected={currentSelected} />}

          <Col {...heroCardSpan} className="no-padding-card">
            <Card
              title={`Hero - ${capitalize(currentHero)}`}
              bordered={false}
              onClick={() => { onShowModal(); }}
            >
              <Row gutter={16}>
                <Col {...heroImageSpan}>
                  <img
                    align="center"
                    alt=""
                    height="220px"
                    src={HERO_ICONS[currentSelected.hero]}
                    style={{
                      border:  `solid 3px ${currentColor}`,
                      display: 'inline',
                    }}
                  />
                </Col>

                <Col {...heroStatSpan}>
                  <QuickPlayStats
                    currentSelected={currentSelected}
                    currentColor={currentColor}
                    currentHero={currentHero}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected:  state.quickPlayReducer.selected,
    showModal: state.quickPlayReducer.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onShowModal: () => {
      dispatch(openModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlayProfile);
