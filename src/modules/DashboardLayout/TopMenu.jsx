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
        border:     'solid 1px red',
      }}
      >
        <Row type="flex" justify="space-around" align="middle">
          <Col span={2} >
            <span style={{ border: 'solid 1px black' }} >
              <Button
                type="primary"
                onClick={() => { return collapseAction(); }}
              >
                <Icon
                  className="trigger"
                  type={collapseStatus ? 'menu-unfold' : 'menu-fold'}
                  size="medium"
                />
              </Button>
            </span>
          </Col>
          <Col offset={16} span={1} style={{ border: 'solid 1px blue' }} >
            <Button
              disabled
            >
              <Icon type="mail" style={{ fontSize: 18 }} />
            </Button>
          </Col>
          <Col span={4} style={{ border: 'solid 1px black' }}>
            <Avatar shape="square" icon="user" />
            {userName}
          </Col>
          <Col span={1} >
            <Dropdown overlay={settingsOverlay}>
              <Icon type="setting" style={{ fontSize: 18 }} />
            </Dropdown>
          </Col>
        </Row>

      </Header>
    );
  }
}

export default TopMenu;
