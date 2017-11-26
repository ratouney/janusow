import React, { Component } from 'react';
import _, { capitalize } from 'lodash';
import {
  Row,
  Col,
  Card,
} from 'antd';
import {
  HERO_ICONS,
  HERO_CARD_STATS,
  HERO_COLORS,
} from '../../utils/consts';

const arraySlice = (givenArray, groupSize = 3) => {
  return _.map(givenArray, (item, index) => {
    return index % groupSize === 0 ? givenArray.slice(index, index + groupSize) : null;
  })
    .filter((item) => {
      return item;
    });
};

const StatCol = ({ label, value }) => {
  return (
    <div>
      <div style={{ fontWeight: 900 }} >{label}</div>: {value}
    </div>
  );
};

const StatRows = ({
  stat1Label, stat2Label, stat3Label, stat1Value, stat2Value, stat3Value,
}) => {
  return (
    <Row gutter={8} style={{ paddingBottom: 5 }}>
      <Col span={8}>
        <StatCol label={stat1Label} value={stat1Value} />
      </Col>
      {
        stat2Label && stat2Value &&
        <Col span={8}>
          <StatCol label={stat2Label} value={stat2Value} />
        </Col>
      }
      {
        stat3Label && stat3Value &&
        <Col span={8}>
          <StatCol label={stat3Label} value={stat3Value} />
        </Col>
      }
    </Row>
  );
};

class HeroCard extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      data,
    } = this.props;

    // http://jsbin.com/dokivomuzake/1/edit?js,console
    const stats = arraySlice(HERO_CARD_STATS[data.hero], 3);

    console.log('>>>>>> Data : ', data, stats);

    return (
      <div>
        <Row gutter={16}>
          <Col span={5}>
            <img
              align="center"
              alt=""
              height="auto"
              width="100%"
              src={HERO_ICONS[data.hero]}
              style={{
                border:  `solid 5px ${HERO_COLORS[data.hero]}`,
                display: 'inline',
              }}
            />
          </Col>

          <Col span={19}>
            <Card
              title={capitalize(data.hero)}
            >
              {
                stats.map((elem) => {
                  return (
                    <StatRows
                      key={elem[0].label}
                      stat1Label={elem[0].label}
                      stat1Value={elem[0].value(data)}
                      stat2Label={elem[1] && elem[1].label}
                      stat2Value={elem[1] && elem[1].value(data)}
                      stat3Label={elem[2] && elem[2].label}
                      stat3Value={elem[2] && elem[2].value(data)}
                    />
                  );
                })
              }
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HeroCard;
