import React, { Component } from 'react';
import { Form } from 'antd';
import {
  FormItemSelect,
  FormItemSwitch,
  FormItemSubmit,
} from '../../utils/Form/';
import {
  LANGUAGES,
} from '../../utils/consts';

class SettingsForm extends Component {
  componentDidMount() {

  }

  handleSubmit(e, onSubmit) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(this.props.userData, values);
      }
    });
  }

  render() {
    const {
      onSubmit,
      form: { getFieldDecorator },
    } = this.props;

    return (

      <Form onSubmit={(e) => { return this.handleSubmit(e, onSubmit); }} layout="horizontal" >
        <FormItemSwitch
          customFormItemProps={{ label: 'Auto load' }}
          id="autoload"
          getFieldDecorator={getFieldDecorator}
        />

        <FormItemSelect
          customFormItemProps={{ label: 'Language' }}
          customSelectProps={{ placeholder: 'Gibberish' }}
          id="language"
          getFieldDecorator={getFieldDecorator}
          dataSource={LANGUAGES}
        />

        <FormItemSubmit
          buttonContent="Save"
        />
      </Form>

    );
  }
}

export default Form.create()(SettingsForm);
