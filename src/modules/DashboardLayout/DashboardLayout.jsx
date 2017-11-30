import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import windowDimensions from 'react-window-dimensions';
import {
  Layout,
  Modal,
} from 'antd';
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';
import {
  openSidemenu,
  closeSidemenu,
  closeAddModal,
} from './actions';
import { NewAccountFormModal } from './NewAccountFormModal/';
import { fetchUserExist } from '../SelectUser/actions';

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
      menuCollapsed,
      onOpenSidemenu,
      onCloseSidemenu,
    } = this.props;

    if (menuCollapsed) {
      onOpenSidemenu();
    } else {
      onCloseSidemenu();
    }
  }

  render() {
    const {
      children,
      menuCollapsed,
      width,
      addModalOpen,
      onAddSubmit,
      onCloseAddModal,
    } = this.props;

    console.log('addModalOpen : ', addModalOpen);
    return (
      <Layout>
        <NewAccountFormModal
          visible={addModalOpen}
          onCancel={() => { onCloseAddModal(); }}
          onSubmit={(userData, values) => { onAddSubmit(userData, values); }}
        />
        <Sider
          trigger={null}
          position="fixed"
          collapsible
          collapsed={menuCollapsed}
          style={{ height: '100vh', minWidth: '85px' }}
        >
          <SideMenu
            homeText={width}
            collapsed={menuCollapsed}
            menuProps={{
              theme: 'dark',
            }}
          />
        </Sider>
        <Layout>
          <TopMenu
            collapseAction={() => { return this.handleMenuCollapse(); }}
            collapseStatus={menuCollapsed}
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
    menuCollapsed: state.dashboardReducer.menuCollapsed,
    addModalOpen:  state.dashboardReducer.addModalOpen,
    fuseModalOpen: state.dashboardReducer.fuseModalOpen,
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
    onCloseAddModal: () => {
      dispatch(closeAddModal());
    },
    onAddSubmit: (useless, values) => {
      dispatch(fetchUserExist(values));
    },
  };
}

const DashboardLayout  = windowDimensions({
  debounce: (onResize) => { return debounce(onResize, 100); },
})(RenderDashboardLayout);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
