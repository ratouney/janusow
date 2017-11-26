import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
  Avatar,
  Button,
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
          <Link to="/logout">
          Logout
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{
        padding: 0,
      }}
      >
        <Row gutter={16} type="flex" justify="space-around" align="middle" >
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
              <Col span={1} >
                <Button
                  disabled
                  icon="mail"
                />
              </Col>
              <Col span={1} >
                <Avatar shape="square" size="small" icon="user" style={{ marginLeft: 8, marginRight: 8, overflow: 'visible' }} />
              </Col>
              <Dropdown.Button onClick={() => { console.log('Goto account page'); }} overlay={settingsOverlay}>
                {userName}
              </Dropdown.Button>

              {/*  */}
            </Row>
          </Col>
        </Row>

      </Header>
    );
  }
}

export default TopMenu;
