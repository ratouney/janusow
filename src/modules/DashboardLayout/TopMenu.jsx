import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
  Icon,
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
            <Icon type="setting" style={{ marginRight: '5px' }} />
          Settings
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
            <Row gutter={16} type="flex" justify="end" align="center" style={{ marginRight: '8px' }} >
              <Col>
                <Button
                  disabled
                  icon="mail"
                />
              </Col>
              <Col>
                <Dropdown overlay={settingsOverlay}>
                  <Button onClick={() => { console.log('Goto account page'); }}>
                    {userName}
                    <Icon type="down" />
                  </Button >
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>

      </Header>
    );
  }
}

export default TopMenu;
