import React, { Component } from 'react';
import {
  Form,
} from 'antd';
import {
  FormItemInput,
  FormItemSelect,
  FormItemSubmit,
} from '../../utils/Form/';
import {
  REGIONS,
  PLATFORMS,
} from '../../utils/consts';

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

    return (
      <Form onSubmit={(e) => { return this.handleSubmit(e, onSubmit); }} layout="horizontal" >
        <FormItemSelect
          customFormItemProps={{ label: 'Region' }}
          id="region"
          getFieldDecorator={getFieldDecorator}
          dataSource={REGIONS}
        />

        <FormItemSelect
          customFormItemProps={{ label: 'Platform' }}
          id="platform"
          getFieldDecorator={getFieldDecorator}
          dataSource={PLATFORMS}
        />

        <FormItemInput
          isRequired
          customFormItemProps={{ label: 'Username' }}
          customInputProps={{ placeholder: 'Krusher99' }}
          getFieldDecorator={getFieldDecorator}
          id="username"
        />

        {
          isPC &&
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

const mapPropsToFields = ({
  userData = {
    region:    'eu',
    platform:  'pc',
    username:  'Ana',
    battletag: '22345',
  },
}) => {
  return {
    region:    { value: userData.region },
    platform:  { value: userData.platform },
    username:  { value: userData.username },
    battletag: { value: userData.battletag },

  };
};

export default Form.create({ mapPropsToFields })(AccountForm);
