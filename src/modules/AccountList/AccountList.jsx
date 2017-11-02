import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Avatar, Row, Col } from 'antd';
import { fetchUserData } from '../SelectUser';

class AccountList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
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

  renderStatusButton(entry, loaded, isFetchingData) {
    if (isFetchingData) {
      return (
        <Button loading>
            Loading data...
        </Button>
      );
    }
    return (
      loaded ? <Link to={`/account/${entry.username}#${entry.battletag}`} ><Button>Show profile</Button></Link>
        : <Button onClick={() => { return this.props.onRequestData(entry); }}>Load profile</Button>
    );
  }

  render() {
    const {
      accountList,
      isFetchingData,
      onRequestData,
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
      },
      {
        title:     'Region',
        dataIndex: 'region',
      },
      {
        title:     'Data Status',
        dataIndex: 'loaded',
        render:    (value, entry) => {
          return this.renderStatusButton(entry, value, isFetchingData);
        },
      },
    ];

    const rowSelection = {
      onChange: (selectedIndexes, selectedEntries) => { return this.handleChange(selectedIndexes, selectedEntries); },
    };

    return (
      <div>
        {
          this.state.selectedRows.length > 0 &&
          <Row style={{ marginBottom: 12, marginTop: 12, textAlign: 'right' }}>
            <Col>
              <Button onClick={() => { this.handleUpdateSelected(); }} > Update selected</Button>
            </Col>
          </Row>

        }
        <Table rowSelection={rowSelection} columns={columns} dataSource={accountList} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountList:    state.accountReducer.accountList,
    isFetchingData: state.accountReducer.isFetchingData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRequestData: (userData) => {
      dispatch(fetchUserData(userData));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
