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
        <Row gutter={16} type="flex">
          <Col
            className="collapse-trigger"
            xs={4}
            sm={8}
            md={12}
            lg={16}
            xl={20}
          >
            <Button
              style={{ marginLeft: 10 }}
              type="primary"
              size="large"
              onClick={() => { return collapseAction(); }}
              icon={collapseStatus ? 'menu-unfold' : 'menu-fold'}
            />
          </Col>
          <Col
            className="settings-trigger"
            xs={20}
            sm={16}
            md={12}
            lg={8}
            xl={4}
          >
            <Row gutter={16} type="flex" justify="end" align="center" >
              <Col>
                <Button
                  disabled
                  icon="mail"
                />
              </Col>
              <Col>
                <Avatar shape="square" size="small" icon="user" style={{ marginLeft: 8, marginRight: 8, overflow: 'visible' }} />
              </Col>
              <Dropdown.Button onClick={() => { console.log('Goto account page'); }} overlay={settingsOverlay}>
                {userName}
              </Dropdown.Button>
            </Row>
          </Col>
        </Row>

      </Header>
    );
  }
}

export default TopMenu;
