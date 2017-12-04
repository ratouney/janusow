import React from 'react';
import { Form, Radio } from 'antd';
import Styles from './Styles';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const defaultRadioProps = {
  style: {
    width: '100%',
  },
};

const {
  fluidFormItemLayout,
} = Styles;

const defaultFormItemProps = {
  ...fluidFormItemLayout,
  label: 'Select one',
  style: {
    width: '100%',
  },
};

const FormItemRadio = (props) => {
  const {
    getFieldDecorator,
    id,
    isRequired = false,
    requiredMessage = 'Please enter a value',
    customRadioProps,
    customFormItemProps,
    dataSource,
  } = props;

  const radioProps = {
    ...defaultRadioProps,
    ...customRadioProps,
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
        )(<RadioGroup {...radioProps}>
          {
            dataSource.map((elem) => {
              if (elem.button === true) {
                return (
                  <RadioButton value={elem.value} key={elem.value}>
                    {elem.text}
                  </RadioButton>
                );
              }
              return (
                <Radio value={elem.value} key={elem.value}>
                  {elem.text}
                </Radio>
              );
            })
          }
        </RadioGroup>)
      }
    </Form.Item>
  );
};

export default FormItemRadio;
