import React from 'react';
import { Form, Button } from 'antd';

const defaultFormItemProps = {};

const defaultButtonProps = {
  type:     'primary',
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
