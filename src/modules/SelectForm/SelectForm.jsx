
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import {
  FormItemInput,
  FormItemSubmit,
  FormItemSelect,
} from '../../utils/Form/';
import {
  REGIONS,
  PLATFORMS,
} from '../../utils/consts';
import { fetchUserExist } from './../SelectUser/actions';

class SelectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      isSubmitting: false,
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
        this.setState({
          isSubmitting: true,
        });
      }
    });
  }

  render() {
    const {
      form,
      isFetching,
    } = this.props;

    const {
      getFieldDecorator,
    } = form;

    return (
      <Form onSubmit={(e) => { return this.handleSubmit(e); }} layout="horizontal" >
        <FormItemSelect
          id="region"
          getFieldDecorator={getFieldDecorator}
          dataSource={REGIONS}
        />

        <FormItemSelect
          id="platform"
          getFieldDecorator={getFieldDecorator}
          dataSource={PLATFORMS}
        />

        <FormItemInput
          isRequired
          customFormItemProps={{ label: 'Username' }}
          customInputProps={{ placeholder: 'Krusher99' }}
          getFieldDecorator={getFieldDecorator}
          id="username"
        />

        <FormItemInput
          isRequired
          customFormItemProps={{ label: 'Battletag' }}
          customInputProps={{ placeholder: '1337' }}
          getFieldDecorator={getFieldDecorator}
          id="battletag"
        />

        <FormItemSubmit
          customButtonProps={{ loading: isFetching }}
          buttonContent="Search"
        />
      </Form>
    );
  }
}

const mapPropsToFields = () => {
  return {

    region:    { value: 'eu' },
    platform:  { value: 'pc' },
    username:  { value: 'Ratouney' },
    battletag: { value: '2516' },

  };
};

function mapStateToProps(state) {
  return {
    isFetching: state.accountReducer.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (userConfig) => {
      dispatch(fetchUserExist(userConfig));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ mapPropsToFields })(SelectForm));
