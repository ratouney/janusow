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
        onSubmit(values);
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
          customFormItemProps={{ label: 'Auto load after adding Account' }}
          id="autoLoad"
          getFieldDecorator={getFieldDecorator}
        />

        <FormItemSwitch
          customFormItemProps={{ label: 'Preload Account data on PageOpen' }}
          id="preload"
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

const mapPropsToFields = ({ settings }) => {
  console.log('Props to Fields : ', settings);
  return {
    autoLoad: { value: settings.autoLoad },
    preload:  { value: settings.preload },
    language: { value: settings.language },
  };
};

export default Form.create({ mapPropsToFields })(SettingsForm);
