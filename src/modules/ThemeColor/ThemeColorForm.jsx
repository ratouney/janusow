import React, { Component } from 'react';
import less from 'less';
import { Form } from 'antd';
import { FormItemInput, FormItemSubmit } from '../../utils/Form';


class ThemeColorForm extends Component {
  componentDidMount() {
    // stuff
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        less.modifyVars({
          'themeColor': values.color
        })
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    console.log('Form  :', getFieldDecorator);

    return (
      <Form onSubmit={this.handleSubmit} style={{ border: 'solid 5px red'}} >
        <FormItemInput
          id="color"
          getFieldDecorator={getFieldDecorator}
        />
        <FormItemSubmit />
      </Form>
    );
  }
}

export default Form.create()(ThemeColorForm);
