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
      <span>
        <Link to="/" >
          <div style={{
            border:       'solid 3px #b57320',
            color:        'white',
            height:       '200px',
            marginBottom: '10px',
          }}
          >
            <img src="https://image.ibb.co/kogbFG/Screen_Shot_2017_11_29_at_11_10_42.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
          </div>
        </Link>
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
      </span>
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
