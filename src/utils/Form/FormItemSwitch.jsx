import React from 'react';
import { Form, Switch } from 'antd';
import Styles from './Styles';

const defaultSwitchProps = {
  // defaultChecked: false,
};

const {
  fluidFormItemLayout,
} = Styles;

const defaultFormItemProps = {
  ...fluidFormItemLayout,
  width: '100vh',
};

const FormItemSwitch = (props) => {
  const {
    getFieldDecorator,
    id,
    isRequired = false,
    customSwitchProps,
    requiredMessage,
    customFormItemProps,
  } = props;

  const switchProps = {
    ...defaultSwitchProps,
    ...customSwitchProps,
  };

  const formItemProps = {
    ...defaultFormItemProps,
    ...customFormItemProps,
  };

  return (
    <Form.Item
      {...formItemProps}
    >
      {
        getFieldDecorator(
          id,
          { rules: [{ required: isRequired, message: requiredMessage }], valuePropName: 'checked' },
        )(<Switch {...switchProps} />)
      }
    </Form.Item>
  );
};

export default FormItemSwitch;
