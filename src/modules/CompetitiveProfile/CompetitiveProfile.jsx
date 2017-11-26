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
  CompetitiveHeroes,
} from '../../utils/ApiParse';
import {
  HERO_ICONS,
  HERO_COLORS,
} from '../../utils/consts';
import CompetitivePieChart from './CompetitivePieChart';
import CompetitiveStats from './CompetitiveStats';
import CompetitiveList from './CompetitiveList';
import CompetitiveModal from './CompetitiveModal';
import { openModal } from './duck-reducer';

class CompetitiveProfile extends Component {
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

    const CompHeroes = CompetitiveHeroes(data);
    console.log('CompData : ', CompHeroes);

    const currentSelected = isEmpty(selected) ? CompHeroes[0] : selected;
    const currentColor = HERO_COLORS[currentSelected.hero];
    const currentHero = currentSelected.hero;

    return (
      <Card title={<h2>{username}</h2>} bordered={false}>
        <Row gutter={24}>
          <Col span={10}>
            <Card
              title="Total hours per hero"
              style={{ height: '300px' }}
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

          <Col span={14}>
            <Card
              title={capitalize(currentHero)}
              style={{ height: '300px' }}
              bordered={false}
              onClick={() => { onShowModal(); }}
            >
              <Row gutter={16}>
                <Col span={5}>
                  <img
                    align="center"
                    alt=""
                    height="auto"
                    width="100%"
                    src={HERO_ICONS[currentSelected.hero]}
                    style={{
                      border:  `solid 3px ${currentColor}`,
                      display: 'inline',
                    }}
                  />
                </Col>

                <Col span={19}>
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
