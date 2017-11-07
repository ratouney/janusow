import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
  Avatar,
  Button,
  Icon,
  Dropdown,
  Menu,
} from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

class TopMenu extends Component {
  componentDidMount() {
    // fetch stuff
  }

  render() {
    const {
      userName = 'Guest',
      collapseAction,
      collapseStatus,
    } = this.props;

    const settingsOverlay = (
      <Menu>
        <Menu.Item key="1">
          <Link to="/settings">
          Settings
          </Link>
        </Menu.Item>
        <Menu.Item key="2" >
          <Link to="/reset">
          Reset data
          </Link>
        </Menu.Item>
        <Menu.Item key="3" >
          <Link to="/logout">
          Logout
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{
        background: '#fff',
        padding:    0,

      }}
      >
        <Row gutter={16} type="flex" justify="space-around" align="middle" style={{ border: 'solid 1px black' }}>
          <Col span={2} >
            <span>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                size="large"
                onClick={() => { return collapseAction(); }}
                icon={collapseStatus ? 'menu-unfold' : 'menu-fold'}
              />
            </span>
          </Col>
          <Col span={22}>
            <Row type="flex" justify="end" align="middle" style={{ marginRight: 50 }} >
              <Col span={3} style={{ border: 'solid 1px red' }} >
                <Button
                  disabled
                  icon="mail"
                />
              </Col>
              <Col offset={3} span={4} style={{ border: 'solid 1px blue' }}>
                <Avatar shape="square" size="small" icon="user" style={{ marginLeft: 8, marginRight: 8, overflow: 'visible' }} />
              </Col>
              <Col span={5} style={{ border: 'solid 1px green' }}>
                {userName}
              </Col>
              <Dropdown overlay={settingsOverlay}>
                <Button>
                  <Icon type="down" />
                </Button>
              </Dropdown>

              {/*  */}
            </Row>
          </Col>
        </Row>

      </Header>
    );
  }
}

export default TopMenu;
