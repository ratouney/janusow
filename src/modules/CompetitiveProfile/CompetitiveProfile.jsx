import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, capitalize } from 'lodash';
import {
  Card,
  Switch,
  Row,
  Col,
  Button,
} from 'antd';
import {
  CompetitiveHeroes,
} from '../../utils/ApiParse';
import {
  HERO_ICONS,
} from '../../utils/consts';
import CompetitivePieChart from './CompetitivePieChart';
import CompetitiveStats from './CompetitiveStats';
import CompetitiveList from './CompetitiveList';
import CompetitiveModal from './CompetitiveModal';
import { openModal } from './duck-reducer';
import getHeroColors from '../../utils/getHeroColors';

const heroColors = getHeroColors(document);

class CompetitiveProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPiechart: true,
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

    const CompHeroes = CompetitiveHeroes(data);

    const currentSelected = isEmpty(selected) ? CompHeroes[0] : selected;
    const currentColor = heroColors[currentSelected.hero].backgroundColor;
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
      sm: 7,
      md: 5,
      lg: 7,
      xl: 6,
    };

    const heroStatSpan = {
      xs: 24,
      sm: 24 - heroImageSpan.sm,
      md: 24 - heroImageSpan.md,
      lg: 24 - heroImageSpan.lg,
      xl: 24 - heroImageSpan.xl,
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
                  ? <CompetitivePieChart data={data} />
                  : <CompetitiveList data={data} />
              }
            </Card>
          </Col>

          {showModal && <CompetitiveModal selected={currentSelected} />}

          <Col {...heroCardSpan} className="no-padding-card">
            <Card
              title={capitalize(currentHero)}
              bordered={false}
              extra={<Button onClick={() => { onShowModal(); }}>Further Information</Button>}
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
                      display: 'block',
                      margin:  'auto',
                    }}
                  />
                </Col>

                <Col {...heroStatSpan}>
                  <CompetitiveStats
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
    selected:  state.competitiveReducer.selected,
    showModal: state.competitiveReducer.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onShowModal: () => {
      dispatch(openModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitiveProfile);
