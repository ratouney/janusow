import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Menu,
  Avatar,
  Input,
  Switch,
  Button,
  Row,
  Col,
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import DB from '../../utils/DB/';
import { reset as resetQPSelected } from '../QuickPlayProfile/duck-reducer';
import { reset as resetCompSelected } from '../CompetitiveProfile/duck-reducer';
import ModalAccountForm from '../AccountForm/ModalAccountForm/ModalAccountForm';
import ModalMultiAccountForm from '../MultiAccountForm/ModalMultiAccountForm/';
import {
  openAddModal,
  closeAddModal,
  openFuseModal,
  closeFuseModal,
  toggleTypeFilter,
  setFilterSearch,
} from './duck-reducer';
import {
  fetchUserExist,
} from '../SelectUser/';

const { Search } = Input;
const { Item, SubMenu } = Menu;

const AccountItem = ({ icon, name }) => {
  return (
    <span>
      <Avatar src={icon} style={{ marginBottom: -12, marginRight: 20 }} />
      <span className="account-item-text">
        {name}
      </span>
    </span>
  );
};

class SideMenu extends Component {
  constructor(props) {
    super(props);

    const users =
      DB.get('users')
        .value();

    const groups =
        DB.get('groups')
          .value();

    this.state = {
      filters:  false,
      accounts: users || [],
      groups:   groups || [],
    };
  }

  componentDidUpdate() {
    const users =
      DB.get('users')
        .value();

    const groups =
      DB.get('groups')
        .value();

    // eslint-disable-next-line
    this.state = {
      ...this.state,
      accounts: users || [],
      groups:   groups || [],
    };
  }

  handleSwitch() {
    this.props.onToggleTypeFilter;
  }

  handleFilter(search) {
    this.setState({
      search,
    });
  }

  render() {
    const {
      collapsed,
      onChangeAccount,
      showAddModal,
      onCloseAddModal,
      onOpenAddModal,
      onFetchUserExist,
      showFuseModal,
      onOpenFuseModal,
      onCloseFuseModal,
      onToggleTypeFilter,
      onSetFilterSearch,
      filterSearch,
      filterShowAccounts,
    } = this.props;

    const {
      accounts,
      groups,
    } = this.state;

    let source = filterShowAccounts ? accounts : groups;

    if (filterSearch !== '') {
      const reg = new RegExp(filterSearch, 'gi');

      source = source.filter((elem) => {
        if (elem.groupname) {
          return elem.groupname.match(reg);
        }
        return elem.username.match(reg);
      });
    }

    return (
      <span>
        <ModalAccountForm
          overrideVisible={{ do: true, value: showAddModal }}
          userData={{}}
          onCancel={onCloseAddModal}
          onSubmit={(a, b) => {
            onFetchUserExist(b);
          }}
        />
        <ModalMultiAccountForm
          visible={showFuseModal}
          onCancel={onCloseFuseModal}
        />
        <Link to="/" >
          <div style={{
            color:        'white',
            height:       collapsed ? '55px' : '250px',
            marginBottom: '10px',
          }}
          >
            <img
              src={collapsed
                ? 'https://image.ibb.co/jKz1hw/logo.png'
                : 'https://image.ibb.co/e75qaG/24273324_1514772271952775_764001959_n_1.png'}
              alt="Logo"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Link>
        <Row className="action-buttons" justify="center" align="middle">
          <Col span={collapsed ? 24 : 10} style={{ marginLeft: '5px', marginRight: '5px' }} >
            <Button
              style={{ width: '100%' }}
              type="ghost"
              onClick={() => { return onOpenAddModal(); }}
            >
            Add
            </Button>
          </Col>
          <Col span={collapsed ? 24 : 10} style={{ marginLeft: '5px', marginRight: '5px' }} >
            <Button
              style={{ width: '100%' }}
              type="ghost"
              onClick={() => { return onOpenFuseModal(); }}
            >
        Fuse
            </Button>
          </Col>
        </Row>
        <Menu theme="dark" mode="inline">
          {
            !collapsed &&
            <SubMenu
              title="Filters"
              style={{ marginBottom: 10 }}
              onTitleClick={() => { this.setState({ filters: !this.state.filters }); }}
            >
              <Item key="1">
                <Search
                  onSearch={(e) => { onSetFilterSearch(e); }}
                  suffix={null}
                />
              </Item>
              <Item key="2">
                <Switch
                  checked={filterShowAccounts}
                  onChange={() => { return onToggleTypeFilter(); }}
                  checkedChildren="Show Accounts"
                  unCheckedChildren="Show Groups"
                />
              </Item>
            </SubMenu>
          }
          {
            source.map((elem) => {
              if (elem.groupname) {
                if (collapsed) {
                  return (
                    <Item
                      className="account-item"
                      onClick={() => { console.log('Open group  :', elem.groupname); }}
                      key={elem.groupname}
                    >
                      <Link to={`/group/${elem.groupname}`}>
                        <AccountItem
                          collapsed
                          icon={elem.children[0].icon}
                          name={`${elem.children[0].username}#${elem.children[0].battletag}`}
                        />
                      </Link>
                    </Item>
                  );
                }
                return (
                  <SubMenu
                    key={elem.groupname}
                    className="group-account-menu"
                    title={<Link to={`/group/${elem.groupname}`} >{elem.groupname}</Link>}
                  >
                    {elem.children.map((account) => {
                      return (
                        <Item
                          className="group-account-item"
                          key={`${account.username}#${account.battletag}`}
                          onClick={() => { onChangeAccount(); }}
                        >
                          <AccountItem
                            collapsed={collapsed}
                            icon={account.icon}
                            name={`${account.username}#${account.battletag}`}
                          />
                        </Item>
                      );
                    })}
                  </SubMenu>
                );
              }
              return (
                <Item
                  className="account-item"
                  key={`${elem.username}#${elem.battletag}`}
                  onClick={() => { onChangeAccount(); }}
                >
                  <Link to={`/account/${elem.username}-${elem.battletag}`}>
                    <AccountItem
                      collapsed={collapsed}
                      icon={elem.icon}
                      name={`${elem.username}#${elem.battletag}`}
                    />
                  </Link>
                </Item>
              );
            })
          }
        </Menu>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchStep:         state.accountReducer.searchStep,
    showAddModal:       state.dashboardReducer.showAddModal,
    showFuseModal:      state.dashboardReducer.showFuseModal,
    filterShowAccounts: state.dashboardReducer.filterShowAccounts,
    filterSearch:       state.dashboardReducer.filterSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeAccount: () => {
      dispatch(resetQPSelected());
      dispatch(resetCompSelected());
    },
    onOpenAddModal: () => {
      dispatch(openAddModal());
    },
    onCloseAddModal: () => {
      dispatch(closeAddModal());
    },
    onOpenFuseModal: () => {
      dispatch(openFuseModal());
    },
    onCloseFuseModal: () => {
      dispatch(closeFuseModal());
    },
    onFetchUserExist: (userData) => {
      dispatch(fetchUserExist(userData));
    },
    onSetFilterSearch: (search) => {
      dispatch(setFilterSearch(search));
    },
    onToggleTypeFilter: () => {
      dispatch(toggleTypeFilter());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
