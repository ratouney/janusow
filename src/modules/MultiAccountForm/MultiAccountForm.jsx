import React, { Component } from 'react';
import {
  Transfer,
  Form,
  Row,
  Col,
} from 'antd';
import { connect } from 'react-redux';
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

  componentWillReceiveProps(nextProps) {
    console.log('Next : ', nextProps);
    console.log('Now : ', this.props);

    this.setState({
      dataSource: this.props.accountList.map((elem) => {
        return {
          key:         elem.key,
          title:       elem.key,
          description: `${elem.key}-${elem.platform}-${elem.region}`,
        };
      }),
    });
  }

  handleSubmit(e, onSubmit) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { accountList } = this.props;
        const { selectedKeys } = this.state;

        const data = {
          children: accountList.filter((elem) => {
            return selectedKeys.includes(elem.key);
          }),
          groupname: values.groupname,
        };

        onSubmit(data, values.groupname);
      }
    });
  }

  render() {
    const {
      accountList,
      onAddGroup,
      form: { getFieldDecorator },
    } = this.props;

    const showForm = this.state.selectedKeys.length > 1;

    const transferSpan = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 12,
      xl: 12,
    };

    const fieldsSpan = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 12,
      xl: 12,
    };

    console.log('accountList : ', accountList);

    return (
      <Row>
        <Col {...transferSpan}>
          <Transfer
            className="multi-account-transfer"
            showSearch
            dataSource={this.state.dataSource}
            render={(item) => { return `${item.title}`; }}
            // onChange={(keys) => { this.setState({ selectedKeys: keys }); }}
            // targetKeys={this.state.selectedKeys}
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
  console.log('State : ', state);
  return {
    accountList: state.accountReducer.accountList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddGroup: (data, name) => {
      dispatch(addGroup(data, name));
    },
  };
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(MultiAccountForm));
