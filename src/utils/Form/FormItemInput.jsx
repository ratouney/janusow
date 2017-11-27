import React from 'react';
import { Form, Input } from 'antd';
import Styles from './Styles';

const defaultInputProps = {
  placeholder: 'Enter',
};

const {
  fluidFormItemLayout,
} = Styles;

const defaultFormItemProps = {
  ...fluidFormItemLayout,
  label: 'Input',
  style: {
    width: '100%',
  },
};

const FormItemInput = (props) => {
  const {
    getFieldDecorator,
    id,
    isRequired = false,
    requiredMessage = 'Please enter a value',
    customInputProps,
    customFormItemProps,
  } = props;

  const inputProps = {
    ...defaultInputProps,
    ...customInputProps,
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
          { rules: [{ required: isRequired, message: requiredMessage }] },
        )(<Input {...inputProps} />)
      }
    </Form.Item>
  );
};

export default FormItemInput;
