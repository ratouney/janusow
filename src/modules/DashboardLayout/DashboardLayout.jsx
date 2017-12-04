import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import windowDimensions from 'react-window-dimensions';
import {
  Layout,
} from 'antd';
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';
import {
  openSidemenu,
  closeSidemenu,
} from './duck-reducer';

const { Sider, Content } = Layout;

class RenderDashboardLayout extends Component {
  constructor(props) {
    super(props);

    if (props.width < 500) {
      props.onCloseSidemenu();
    }
  }

  handleMenuCollapse() {
    const {
      showSidemenu,
      onOpenSidemenu,
      onCloseSidemenu,
    } = this.props;

    if (showSidemenu) {
      onCloseSidemenu();
    } else {
      onOpenSidemenu();
    }
  }

  render() {
    const {
      children,
      width,
      showSidemenu,
    } = this.props;

    return (
      <Layout>
        <Sider
          trigger={null}
          position="fixed"
          collapsible
          collapsed={!showSidemenu}
          style={{ height: '100vh', minWidth: '85px' }}
        >
          <SideMenu
            homeText={width}
            collapsed={!showSidemenu}
            menuProps={{
              theme: 'dark',
            }}
          />
        </Sider>
        <Layout>
          <TopMenu
            collapseAction={() => { return this.handleMenuCollapse(); }}
            collapseStatus={!showSidemenu}
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

function mapStateToProps(state) {
  return {
    showSidemenu: state.dashboardReducer.showSidemenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onOpenSidemenu: () => {
      dispatch(openSidemenu());
    },
    onCloseSidemenu: () => {
      dispatch(closeSidemenu());
    },
  };
}

const DashboardLayout = windowDimensions({
  debounce: (onResize) => { return debounce(onResize, 100); },
})(RenderDashboardLayout);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
