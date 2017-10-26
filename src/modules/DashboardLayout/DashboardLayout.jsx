import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  }

  handleMenuCollapse() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const {
      children,
      accountData = [],
      hasFound,
    } = this.props;

    let accounts = [];

    if (accountData.length) {
      accounts = accountData.map((elem) => {
        return {
          key:     elem.fullname,
          text:    elem.fullname,
          value:   elem.fullname,
          iconUrl: elem.icon,
        };
      });
    }

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
            collapsed={this.state.collapsed}
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

function mapStateToProps(state) {
  return {
    accountData: state.accountReducer.accountData,
    hasFound:    state.accountReducer.hasFound,
  };
}

export default connect(mapStateToProps)(DashboardLayout);
