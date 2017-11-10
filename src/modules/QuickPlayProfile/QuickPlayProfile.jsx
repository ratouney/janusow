import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, capitalize } from 'lodash';
import {
  Card,
  Row,
  Avatar,
  Col,
} from 'antd';
import {
  QuickPlay,
  QuickPlayHeroes,
} from '../../utils/ApiParse';
import {
  HERO_ICONS,
  HERO_COLORS,
} from '../../utils/consts';
import QuickPlayPieChart from './QuickPlayPieChart';
import QuickPlayStats from './QuickPlayStats';

class QuickPlayProfile extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    const {
      data,
      username,
      selected,
    } = this.props;

    const QPHeroes = QuickPlayHeroes(data);

    const currentSelected = isEmpty(selected) ? QPHeroes[0] : selected;
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
            >
              <QuickPlayPieChart data={data} />
            </Card>
          </Col>

          <Col span={14}>
            <Card title={capitalize(currentHero)} style={{ height: '300px' }} bordered={false}>
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
    selected: state.quickPlayReducer.selected,
  };
}

export default connect(mapStateToProps)(QuickPlayProfile);
