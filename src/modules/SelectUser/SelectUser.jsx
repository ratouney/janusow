import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Card } from 'antd';
import {
  FormItemInput,
  FormItemSubmit,
  FormItemSelect,
} from '../../utils/Form/';
import { addNewUser } from './actions';

const REGIONS = [
  {
    key:   '1',
    value: 'eu',
    text:  'Europe',
  },
  {
    key:   '2',
    value: 'us',
    text:  'US',
  },
  {
    key:   '3',
    value: 'kr',
    text:  'Korea',
  },
];

const PLATFORMS = [
  {
    key:   '1',
    value: 'pc',
    text:  'Masterrace',
  },
  {
    key:   '2',
    value: 'pns',
    text:  'Playstation 4',
  },
  {
    key:   '3',
    value: 'xbl',
    text:  'Xbox One',
  },
];

class SelectUser extends Component {
  componentDidMount() {
    // stuff
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const {
      form,
    } = this.props;

    const {
      getFieldDecorator,
    } = form;

    return (
      <div>
        <Card title="Select your account" >
          <Form onSubmit={(e) => { return this.handleSubmit(e); }} >
            <Row>
              <Col span={4} style={{ margin: 5 }} >
                <FormItemSelect
                  id="region"
                  getFieldDecorator={getFieldDecorator}
                  dataSource={REGIONS}
                />
              </Col>
              <Col span={4} style={{ margin: 5 }} >
                <FormItemSelect
                  id="platform"
                  getFieldDecorator={getFieldDecorator}
                  dataSource={PLATFORMS}
                />
              </Col>
              <Col span={4} style={{ margin: 5 }} >
                <FormItemInput
                  isRequired
                  customFormItemProps={{ label: 'Username' }}
                  customInputProps={{ placeholder: 'Krusher99' }}
                  getFieldDecorator={getFieldDecorator}
                  id="username"
                />
              </Col>
              <Col span={4} style={{ margin: 5 }} >
                <FormItemInput
                  isRequired
                  customFormItemProps={{ label: 'Battletag' }}
                  customInputProps={{ placeholder: '1337' }}
                  getFieldDecorator={getFieldDecorator}
                  id="battletag"
                />
              </Col>
            </Row>
            <FormItemSubmit />

          </Form>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (userConfig) => {
      dispatch(addNewUser(userConfig));
    },
  };
}

const mapPropsToFields = () => {
  return {
    region:    { value: 'eu' },
    platform:  { value: 'pc' },
    username:  { value: 'Ratouney' },
    battletag: { value: '2516' },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ mapPropsToFields })(SelectUser));
