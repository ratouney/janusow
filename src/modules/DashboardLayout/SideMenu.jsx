import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import DB from '../../utils/DB/';
import { reset as resetQPSelected } from '../QuickPlayProfile/duck-reducer';
import { reset as resetCompSelected } from '../CompetitiveProfile/duck-reducer';

const { Item } = Menu;

class SideMenu extends Component {
  constructor(props) {
    super(props);

    const users =
      DB.get('users')
        .value();

    this.state = {
      accounts: users || [],
    };
  }

  componentDidUpdate() {
    const users =
      DB.get('users')
        .value();

    this.state = {
      ...this.state,
      accounts: users || [],
    };
  }

  render() {
    const {
      homeText = 'HOME',
      menuProps,
      collapsed,
      onChangeAccount,
    } = this.props;

    const {
      accounts,
    } = this.state;

    const ITEMS = [
      {
        key:   '-2',
        to:    '/',
        icon:  { type: 'home' },
        text:  homeText,
        class: 'other-menu-item',
      },
      ...accounts.map((elem) => {
        return {
          key:    `${elem.username}#${elem.battletag}`,
          to:     `/account/${elem.username}-${elem.battletag}`,
          icon:   false,
          avatar: elem.icon,
          text:   `${elem.username}#${elem.battletag}`,
          class:  'account-menu-entry',
        };
      }),
      {
        key:   '-1',
        to:    '/select',
        icon:  { type: 'plus' },
        text:  'Add Account',
        class: 'other-menu-item',
      },
    ];

    return (
      <Menu {...menuProps} mode={collapsed ? 'vertical' : 'inline'}>
        {ITEMS.map((elem) => {
          return (
            <Item
              className={elem.class}
              key={elem.key}
              style={{ marginBottom: 5 }}
            >
              <Link to={elem.to} onClick={() => { onChangeAccount(); }}>
                {
                  elem.icon === false ?
                    <span>
                      <Avatar src={elem.avatar} style={{ marginBottom: -12, marginRight: 20 }} />
                      <span className="menu-text">{elem.text}</span>
                    </span> :
                    <Button style={{ width: '100%', color: '#fff' }} type="ghost">
                      <Icon {...elem.icon} />
                      <span className="menu-text">{elem.text}</span>
                    </Button>
                }
              </Link>
            </Item>
          );
        })}
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchStep: state.accountReducer.searchStep,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeAccount: () => {
      dispatch(resetQPSelected());
      dispatch(resetCompSelected());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
