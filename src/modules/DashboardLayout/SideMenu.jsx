import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Avatar, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import DB from '../../utils/DB/';

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
    } = this.props;

    const {
      accounts,
    } = this.state;


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
            <Item key={`${elem.username}#${elem.battletag}`}>
              <Link to={`/account/${elem.username}#${elem.battletag}`} >
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={6}>
                    <Avatar src={elem.icon} />
                  </Col>
                  {
                    !collapsed
                      ? <Col span={18} >
                        {`${elem.username}#${elem.battletag}`}
                        </Col>
                      : ''
                  }
                </Row>
              </Link>
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

function mapStateToProps(state) {
  return {
    searchStep: state.accountReducer.searchStep,
  };
}

export default connect(mapStateToProps)(SideMenu);
