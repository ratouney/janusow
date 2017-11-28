import React, { Component } from 'react';
import { debounce } from 'lodash';
import windowDimensions from 'react-window-dimensions';
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
      collapsed: props.width < 500,
    };
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
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default windowDimensions({
  debounce: (onResize) => { return debounce(onResize, 100); },
})(DashboardLayout);
