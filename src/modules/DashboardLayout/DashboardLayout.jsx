import React, { Component } from 'react';
import {
  Layout,
  Menu,
  Icon,
  Row,
  Col,
  Button,
} from 'antd';
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';

const { Sider, Content } = Layout;

class DashboardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    console.log('Mounted Dashboard');
  }

  handleMenuCollapse() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <Layout>
        <Sider
          trigger={null}
          position="fixed"
          collapsible
          collapsed={this.state.collapsed}
          style={{ height: '100vh' }}
        >
          <SideMenu
            accounts={[]}
            menuProps={{
              theme:               'dark',
              defaultSelectedKeys: ['2'],
            }}
          />
        </Sider>
        <Layout>
          <TopMenu
            collapseAction={() => { return this.handleMenuCollapse(); }}
            collapseStatus={this.state.collapsed}
          />
          <Content
            style={{
              margin:     '24px 16px',
              padding:    24,
              background: '#fff',
              minHeight:  280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardLayout;
