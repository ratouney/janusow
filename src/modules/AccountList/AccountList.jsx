import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import {
  Button,
  Form,
  Card,
  Table,
  Avatar,
  Row,
  Col,
  Dropdown,
  Menu,
} from 'antd';
import { fetchUserData } from '../SelectUser';
import {
  FormItemInput,
  FormItemSubmit,
} from '../../utils/Form/';
import {
  removeUser,
} from './actions';
import {
  ModalAccountForm,
  open as openAccountModal,
  editUser,
} from '../AccountForm';

class AccountList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
      accountList:  props.accountList,
    };
  }

  handleChange(selectedIndexes, selectedEntries) {
    this.setState({
      selectedRows: selectedEntries,
    });
  }

  handleUpdateSelected() {
    this.state.selectedRows.map((elem) => {
      console.log('Fetching Data for : ', elem);
      this.props.onRequestData(elem);
    });
  }

  handleSearch(search) {
    console.log('Set search to : ', search);

    if (!isEmpty(search)) {
      this.setState({
        accountList: this.props.accountList.filter((elem) => {
          const reg = new RegExp(search, 'gi');
          return elem.username.match(reg);
        }),
      });
    } else {
      this.setState({
        accountList: this.props.accountList,
      });
    }
  }

  componentWillReceiveProps({ accountList }) {
    this.setState({
      accountList,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.handleSearch(values.search);
      }
    });
  }

  renderStatusButton(entry, loaded) {
    const {
      isFetchingData,
      onRequestData,
      onRemoveUser,
      onOpenSelectModal,
    } = this.props;

    if (isFetchingData) {
      return (
        <Button loading>
            Loading data...
        </Button>
      );
    }

    const menu = (
      <Menu>
        <Menu.Item>
          {
            loaded ? <Link to={`/account/${entry.username}#${entry.battletag}`}>
              <Button style={{ width: '100%' }} icon="search">
                  Show profile
              </Button>
                     </Link>
              : <Button onClick={() => { return onRequestData(entry); }} style={{ width: '100%' }} icon="reload" >Load profile</Button>
          }
        </Menu.Item>
        <Menu.Item>
          <Button icon="edit" onClick={() => { return onOpenSelectModal(entry); }} style={{ width: '100%' }}>
                Edit User
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button icon="delete" onClick={() => { return onRemoveUser(entry); }} >
        Delete User
          </Button>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button style={{ marginLeft: 8 }} icon="tool">
        Settings
        </Button>
      </Dropdown>
    );
  }


  render() {
    const {
      onEditUser,
      modalVisible,
    } = this.props;

    const columns = [
      {
        title:     '',
        dataIndex: 'icon',
        width:     '80px',
        render:    (icon) => {
          return (
            <Avatar src={icon} />
          );
        },
      },
      {
        title:     'Username',
        dataIndex: 'username',
        render:    (_, elem) => { return (`${elem.username}#${elem.battletag}`); },
      },
      {
        title:     'Platform',
        dataIndex: 'platform',
        render:    (val) => {
          if (val === 'pc') {
            return 'PC';
          }
          if (val === 'psn') {
            return 'Playstation 4';
          }
          return 'XBox One';
        },
      },
      {
        title:     'Region',
        dataIndex: 'region',
      },
      {
        title:     'Actions',
        dataIndex: 'loaded',
        render:    (value, entry) => {
          return this.renderStatusButton(entry, value);
        },
      },
    ];

    const rowSelection = {
      onChange: (selectedIndexes, selectedEntries) => { return this.handleChange(selectedIndexes, selectedEntries); },
    };

    return (
      <Card>
        {
          modalVisible && <ModalAccountForm
            onSubmit={(before, after) => { return onEditUser(before, after); }}
            customModalProps={{ title: 'Edit User' }}
          />
        }
        <Row style={{ marginBottom: 12, marginTop: 12 }}>
          <Form layout="inline" onSubmit={(e) => { return this.handleSubmit(e); }} >
            <Col style={{ textAlign: 'left' }} span={6} >
              <FormItemInput
                id="search"
                customFormItemProps={{ label: 'Search Account' }}
                getFieldDecorator={this.props.form.getFieldDecorator}
              />
            </Col>
            <Col span={2} >
              <FormItemSubmit
                buttonContent="Search"
              />
            </Col>
          </Form>
          {
            this.state.selectedRows.length > 0 &&
            <Col style={{ textAlign: 'right' }} >
              <Button onClick={() => { this.handleUpdateSelected(); }} > Update selected</Button>
            </Col>
          }
        </Row>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.accountList} />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountList:    state.accountReducer.accountList,
    isFetchingData: state.accountReducer.isFetchingData,
    modalVisible:   state.accountModalReducer.visible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRequestData: (userData) => {
      dispatch(fetchUserData(userData));
    },
    onRemoveUser: (userData) => {
      dispatch(removeUser(userData));
    },
    onOpenSelectModal: (userData) => {
      dispatch(openAccountModal(userData));
    },
    onEditUser: (before, after) => {
      dispatch(editUser(before, after));
    },
  };
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(AccountList));
