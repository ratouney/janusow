import React, { Component } from 'react';
import windowDimensions from 'react-window-dimensions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
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
  FormItemSelect,
  FormItemSubmit,
} from '../../utils/Form/';
import {
  removeUser,
  setFiltered,
} from './actions';
import {
  ModalAccountForm,
  open as openAccountModal,
  editUser,
} from '../AccountForm';
import {
  REGIONS,
  PLATFORMS,
} from '../../utils/consts/';

const filterFormLayout = {
  style: { marginRight: 10, marginBottom: 10 },
  xs:    24,
  sm:    24,
  md:    5,
  lg:    5,
  xl:    5,
};

class AccountList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
      accountList:  props.accountList,
    };
  }

  componentWillReceiveProps({ accountList }) {
    this.setState({
      accountList,
    });
  }

  handleChange(selectedIndexes, selectedEntries) {
    this.setState({
      selectedRows: selectedEntries,
    });
  }

  handleUpdateSelected() {
    this.state.selectedRows.map((elem) => {
      return this.props.onRequestData(elem);
    });
  }

  handleSearch(username, region, platform) {
    const {
      accountList,
      onSetFiltered,
    } = this.props;

    let acclist = accountList;

    if (region !== undefined) {
      acclist = acclist.filter((elem) => { return elem.region === region; });
    }
    if (platform !== undefined) {
      acclist = acclist.filter((elem) => { return elem.platform === platform; });
    }
    if (username !== undefined) {
      acclist = acclist.filter((elem) => {
        const reg = new RegExp(username, 'gi');
        return elem.username.match(reg);
      });
    }

    onSetFiltered(acclist);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.handleSearch(values.search, values.region, values.platform);
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
            loaded ?
              <Link to={`/account/${entry.username}-${entry.battletag}`}>
                <Button style={{ width: '100%' }} icon="search">
                  Show profile
                </Button>
              </Link>
              : <Button onClick={() => { return onRequestData(entry); }} style={{ width: '100%' }} icon="reload" >Load profile</Button>
          }
        </Menu.Item>
        <Menu.Item>
          <Button
            icon="edit"
            onClick={() => { return onOpenSelectModal(entry); }}
            style={{ width: '100%' }}
          >
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
      filteredAccounts,
      form: { getFieldDecorator },
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
        width:     '200px',
        render:    (_, elem) => { return (`${elem.username}#${elem.battletag}`); },
      },
      {
        title:     'Platform',
        dataIndex: 'platform',
        width:     '80px',
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
        width:     '80px',
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
            <Col {...filterFormLayout}>
              <FormItemInput
                id="search"
                customFormItemProps={{ label: null }}
                customInputProps={{ placeholder: 'Username' }}
                getFieldDecorator={getFieldDecorator}
              />
            </Col>
            <Col {...filterFormLayout} >
              <FormItemSelect
                id="region"
                getFieldDecorator={getFieldDecorator}
                customSelectProps={{ placeholder: 'Region' }}
                dataSource={REGIONS}
              />
            </Col>
            <Col {...filterFormLayout} >
              <FormItemSelect
                id="platform"
                getFieldDecorator={getFieldDecorator}
                customSelectProps={{ placeholder: 'Platform' }}
                dataSource={PLATFORMS}
              />
            </Col>
            <Col {...filterFormLayout} >
              <FormItemSubmit
                buttonContent="Search"
              />
            </Col>
          </Form>
        </Row>
        {
          this.state.selectedRows.length > 0 &&
            <Row style={{ marginBottom: 12, marginTop: 12 }}>
              <Col style={{ textAlign: 'right' }} >
                <Button onClick={() => { this.handleUpdateSelected(); }} > Load selected</Button>
              </Col>
            </Row>
        }
        <Table rowSelection={rowSelection} columns={columns} dataSource={filteredAccounts || []} scroll={{ x: 600 }} />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountList:      state.accountReducer.accountList,
    isFetchingData:   state.accountReducer.isFetchingData,
    filteredAccounts: state.accountReducer.filteredAccounts,
    modalVisible:     state.accountModalReducer.visible,
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
    onSetFiltered: (filtered) => {
      dispatch(setFiltered(filtered));
    },
  };
}

export default windowDimensions({
  debounce: (onResize) => { return debounce(onResize, 100); },
})(Form.create()(connect(mapStateToProps, mapDispatchToProps)(AccountList)));
