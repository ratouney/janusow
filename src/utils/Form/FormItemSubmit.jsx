import React from 'react';
import { Form, Button } from 'antd';
import Styles from './Styles';

const {
  fluidFormItemLayout,
} = Styles;

const defaultFormItemProps = {
  ...fluidFormItemLayout,
  style: {
    width: '100%',
  },
};

const defaultButtonProps = {
  type:  'primary',
  style: {
    width: '100%',
  },
  htmlType: 'submit',
};

const FormItemSubmit = ({ customButtonProps, customFormItemProps, buttonContent = 'Submit' }) => {
  const formItemProps = {
    ...defaultFormItemProps,
    ...customFormItemProps,
  };

  const buttonProps = {
    ...defaultButtonProps,
    ...customButtonProps,
  };

  return (
    <Form.Item
      {...formItemProps}
    >
      <Button
        {...buttonProps}
      >
        {buttonContent}
      </Button>
    </Form.Item>
  );
};

export default FormItemSubmit;
