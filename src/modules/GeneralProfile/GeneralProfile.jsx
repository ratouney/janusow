import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
} from 'antd';

class GeneralProfile extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      data,
      username,
    } = this.props;

    console.log('Data : ', data);

    return (
      <Card title={<h2>{username}</h2>} bordered={false}>
        <Row gutter={24}>
          <Col span={5}>
            <img src={data.ratingIcon} alt="Unranked" />
          </Col>
          <Col span={5}>
            <img src={data.levelIcon} alt="Unleveled" style={{ border: 'solid 1px red' }} />
            <img src={data.prestigeIcon} alt="Unleveled" style={{ position: 'relative', border: 'solid 1px red', top: -130 }} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default GeneralProfile;
