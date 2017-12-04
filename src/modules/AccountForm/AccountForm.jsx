import React, { Component } from 'react';
import {
  Form,
} from 'antd';
import {
  FormItemInput,
  FormItemSubmit,
  FormItemRadio,
} from '../../utils/Form/';
import {
  REGIONS,
  PLATFORMS,
} from '../../utils/consts';

const REGION_BUTTONS = REGIONS.map((elem) => {
  return {
    ...elem,
    key:    elem.value,
    button: true,
  };
});

const PLATFORM_BUTTONS = PLATFORMS.map((elem) => {
  return {
    ...elem,
    key:    elem.value,
    button: true,
  };
});

class AccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
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
      submitButtonContent = 'Submit',
      loading = false,
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const isPC = getFieldValue('platform') === 'pc';
    const hasPreviousValues = getFieldValue('platform') && getFieldValue('region');

    return (
      <Form
        className="account-form-modal"
        onSubmit={(e) => { return this.handleSubmit(e, onSubmit); }}
        layout="horizontal"
      >
        <FormItemRadio
          id="region"
          getFieldDecorator={getFieldDecorator}
          dataSource={REGION_BUTTONS}
          customFormItemProps={{ label: 'Region' }}
        />

        <FormItemRadio
          id="platform"
          getFieldDecorator={getFieldDecorator}
          dataSource={PLATFORM_BUTTONS}
          customFormItemProps={{ label: 'Platform' }}
        />

        {
          hasPreviousValues &&
          <FormItemInput
            isRequired
            customFormItemProps={{ label: 'Username' }}
            customInputProps={{ placeholder: 'Krusher99' }}
            getFieldDecorator={getFieldDecorator}
            id="username"
          />
        }

        {
          hasPreviousValues && isPC &&
          <FormItemInput
            isRequired
            customFormItemProps={{ label: 'Battletag' }}
            customInputProps={{ placeholder: '1337' }}
            getFieldDecorator={getFieldDecorator}
            id="battletag"
          />
        }

        <FormItemSubmit
          customButtonProps={{ loading }}
          buttonContent={submitButtonContent}
        />
      </Form>
    );
  }
}

export default Form.create()(AccountForm);
