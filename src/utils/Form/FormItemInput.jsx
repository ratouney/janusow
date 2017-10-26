import React, { Component } from 'react';
import { Form, Input } from 'antd';

const defaultInputProps = {
  placeholder: 'Enter',
};

const defaultFormItemProps = {
  width: '100vh',
  label: 'Input',
};

const FormItemInput = ({
  getFieldDecorator, id, isRequired = false, requiredMessage = 'Please enter a value', customInputProps, customFormItemProps,
}) => {
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
