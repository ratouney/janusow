import React, { Component } from 'react';
import { Form, Select } from 'antd';

const defaultSelectProps = {
  placeholder: 'Enter',
};

const defaultFormItemProps = {
  hasFeedback: true,
  label:       'Select',
};

const FormItemSelect = (props) => {
  const {
    customFormItemProps,
    customSelectProps,
    getFieldDecorator,
    id,
    isRequired = false,
    dataSource = [],
    requiredMessage = 'Please select an entry',
  } = props;

  const SelectProps = {
    ...defaultSelectProps,
    ...customSelectProps,
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
        )(<Select {...SelectProps}>
          {dataSource.map((elem) => {
            return (
              <Select.Option key={elem.key} value={elem.value} >
                {elem.text}
              </Select.Option>
            );
          })}
        </Select>)
      }
    </Form.Item>
  );
};

export default FormItemSelect;
