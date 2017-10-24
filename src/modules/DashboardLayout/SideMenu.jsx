import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Item } = Menu;

class SideMenu extends Component {
  componentDidMount() {
    // load saved BnetId's from localstorage or props
  }

  render() {
    const {
      accounts = [],
      menuProps,
    } = this.props;

    return (
      <Menu {...menuProps}>
        <Item key="-2">
          <Link to="/" >
            <Icon type="home" />
            <span>
            HOME
            </span>
          </Link>
        </Item>
        {accounts.map((elem) => {
          return (
            <Item key={elem.key}>
              <Icon type={elem.icon} />
              <span>
                {elem.text}
              </span>
            </Item>
          );
        })}
        <Item key="-1">
          <Link to="/select">
            <Icon type="plus" style={{ backgroundColor: 'green', color: 'white' }} />
            <span>
            Add Account
            </span>
          </Link>
        </Item>
      </Menu>
    );
  }
}

export default SideMenu;
