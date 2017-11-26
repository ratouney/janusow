import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Avatar } from 'antd';
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
      menuProps,
      collapsed,
      onChangeAccount,
    } = this.props;

    const {
      accounts,
    } = this.state;

    const ITEMS = [
      {
        key:  '-2',
        to:   '/',
        icon: { type: 'home' },
        text: 'HOME',
      },
      ...accounts.map((elem) => {
        return {
          key:    `${elem.username}#${elem.battletag}`,
          to:     `/account/${elem.username}-${elem.battletag}`,
          icon:   false,
          avatar: elem.icon,
          text:   `${elem.username}#${elem.battletag}`,
        };
      }),
      {
        key:  '-1',
        to:   '/select',
        icon: { type: 'plus', style: { backgroundColor: 'green', color: 'white' } },
        text: 'Add Account',
      },
    ];

    return (
      <Menu {...menuProps} mode={collapsed ? 'vertical' : 'inline'} >
        {ITEMS.map((elem) => {
          return (
            <Item key={elem.key} style={{ marginBottom: 5 }} onClick={() => { onChangeAccount(); }}>
              <Link to={elem.to} onClick={() => { onChangeAccount(); }}>
                {elem.icon === false
                  ? <Avatar src={elem.avatar} />
                  : <Icon {...elem.icon} />
                }
                {
                  !collapsed && elem.text
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
