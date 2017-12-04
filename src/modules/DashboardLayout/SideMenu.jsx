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
import { Link } from 'react-router-dom';
import DB from '../../utils/DB/';
import { reset as resetQPSelected } from '../QuickPlayProfile/duck-reducer';
import { reset as resetCompSelected } from '../CompetitiveProfile/duck-reducer';
import ModalAccountForm from '../AccountForm/ModalAccountForm/ModalAccountForm';
import {
  openAddModal,
  closeAddModal,
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
      showAccounts: true,
      filters:      false,
      accounts:     users || [],
      groups:       groups || [],
      search:       '',
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
    this.setState({
      showAccounts: !this.state.showAccounts,
    });
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
    } = this.props;

    const {
      accounts,
      groups,
      showAccounts,
      search,
      filters,
    } = this.state;

    let source = showAccounts ? accounts : groups;

    if (filters && search !== '') {
      const reg = new RegExp(search, 'gi');

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
        <Row className="action-buttons" >
          <Col span={collapsed ? 24 : 12}>
            <Button
              style={{ width: '100%' }}
              type="ghost"
              onClick={() => { return onOpenAddModal(); }}
            >
            Add
            </Button>
          </Col>
          <Col span={collapsed ? 24 : 12}>
            <Button style={{ width: '100%' }} type="ghost" disabled>
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
                  onSearch={(e) => { this.handleFilter(e); }}
                  suffix={null}
                />
              </Item>
              <Item key="2">
                <Switch
                  checked={showAccounts}
                  onChange={() => { return this.handleSwitch(); }}
                  checkedChildren="Show Accounts"
                  unCheckedChildren="Show Groups"
                />
              </Item>
            </SubMenu>
          }
          {
            source.map((elem) => {
              if (elem.groupname) {
                return (
                  <SubMenu
                    title={elem.groupname}
                    onClick={() => { onChangeAccount(); }}
                  >
                    {elem.children.map((account) => {
                      return (
                        <Item
                          key={`${account.username}#${account.battletag}`}
                        >
                          <AccountItem
                            className="group-account-item"
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
    searchStep:   state.accountReducer.searchStep,
    showAddModal: state.dashboardReducer.showAddModal,
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
    onFetchUserExist: (userData) => {
      dispatch(fetchUserExist(userData));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
