import React, { Component } from 'react';
import {
  Layout,
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
          style={{ height: '100vh', minWidth: '85px' }}
        >
          <SideMenu
            collapsed={this.state.collapsed}
            menuProps={{
              theme: 'dark',
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
