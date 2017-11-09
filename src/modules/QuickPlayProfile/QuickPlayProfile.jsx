import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, capitalize } from 'lodash';
import {
  Card,
  Row,
  Col,
} from 'antd';
import {
  QuickPlay,
  QuickPlayHeroes,
} from '../../utils/ApiParse';
import QuickPlayPieChart from './QuickPlayPieChart';

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

    return (
      <Card title={username}>
        <Row>
          <Col span={10} >
            <Card title="Total hours per hero" >
              <QuickPlayPieChart data={data} />
            </Card>
          </Col>
          <Col span={14} >
            <Card title={capitalize(currentSelected.hero)} >
              inspected hero
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
