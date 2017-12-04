import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  message,
  Col,
  Form,
  Transfer,
} from 'antd';
import {
  FormItemInput,
  FormItemSelect,
  FormItemSubmit,
} from '../../utils/Form/';
import { addGroup } from './actions';

class MultiAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: [],
    };
  }

  handleSubmit(e, onSubmit) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      const { selectedKeys } = this.state;
      if (selectedKeys.length > 1) {
        if (!err) {
          const { accountList } = this.props;

          const data = {
            children: accountList.filter((elem) => {
              return selectedKeys.includes(elem.key);
            }),
            groupname: values.groupname,
            main:      values.main,
          };

          onSubmit(values.groupname, data);
        }
      } else {
        message.error('Select at least 2 accounts');
      }
    });
  }

  /*
  componentDidUpdate(props, state) {
    console.log('Props : ', props, this.props);
    console.log('State : ', state, this.state);
  }
  */

  render() {
    const {
      accountList = [],
      onAddGroup,
      form: { getFieldDecorator },
      inModal = false,
    } = this.props;

    const showForm = this.state.selectedKeys.length > 1;
    let mainSelectData = [];

    const transferSpan = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: inModal ? 24 : 12,
      xl: inModal ? 24 : 12,
    };

    const fieldsSpan = {
      style: {
        marginTop: inModal ? '15px' : '0px',
      },
      xs: 24,
      sm: 24,
      md: 24,
      lg: inModal ? 24 : 12,
      xl: inModal ? 24 : 12,
    };

    const dataSource = accountList.map((elem) => {
      return {
        key:         elem.key,
        title:       elem.key,
        description: elem.key,
      };
    });

    if (showForm) {
      mainSelectData = accountList
        .filter((elem) => {
          return this.state.selectedKeys.includes(elem.key);
        })
        .map((elem) => {
          return {
            key:   elem.key,
            value: elem.key,
            text:  elem.key,
          };
        });
    }

    return (
      <Row>
        <Col {...transferSpan}>
          <Transfer
            className="multi-account-transfer"
            showSearch
            dataSource={dataSource}
            render={(item) => { return (<span>{item.key}</span>); }}
            onChange={(keys) => { this.setState({ selectedKeys: keys }); }}
            targetKeys={this.state.selectedKeys}
          />
        </Col>
        {
          showForm &&
          <Col {...fieldsSpan}>
            <Form
              layout="horizontal"
              onSubmit={(e) => { return this.handleSubmit(e, onAddGroup); }}
            >
              <FormItemInput
                isRequired
                customFormItemProps={{ label: 'Group Name' }}
                customInputProps={{ placeholder: 'Krusher99' }}
                getFieldDecorator={getFieldDecorator}
                id="groupname"
              />
              <FormItemSelect
                customFormItemProps={{ label: 'Main Account' }}
                getFieldDecorator={getFieldDecorator}
                id="main"
                dataSource={mainSelectData}
              />
              <FormItemSubmit
                buttonContent="Save Accounts"
              />
            </Form>
          </Col>
        }
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountList: state.accountReducer.accountList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddGroup: (groupname, data) => {
      dispatch(addGroup(groupname, data));
    },
  };
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(MultiAccountForm));
