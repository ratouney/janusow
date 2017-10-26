import React, { Component } from 'react';
import { Form, Select } from 'antd';

const defaultSelectProps = {
  placeholder: 'Enter',
  style:       {
    width: '100%',
  },
};

const defaultFormItemProps = {
  label: false,
  style: {
    width: '100%',
  },
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

  const selectProps = {
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
        )(<Select {...selectProps}>
          {dataSource.map((elem) => {
            return (
              <Select.Option key={elem.key} value={elem.value}>
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
