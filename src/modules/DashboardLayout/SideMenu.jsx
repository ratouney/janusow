import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

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
        {accounts.map((elem) => {
          return (
            <Item key={elem.id}>
              <Icon type={elem.icon} />
              <span>
                {elem.text}
              </span>
            </Item>
          );
        })}
        <Item key="-1">
          <Icon type="plus" style={{ backgroundColor: 'green', color: 'white' }} />
          <span>
            Add Account
          </span>
        </Item>
      </Menu>
    );
  }
}

export default SideMenu;
