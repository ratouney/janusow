import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Row,
  Col,
  Card,
  Steps,
} from 'antd';
import {
  FormItemInput,
  FormItemSubmit,
  FormItemSelect,
} from '../../utils/Form/';
import { addNewUser } from './actions';
import ProgressDiag from './ProgressDiag';

const { Step } = Steps;

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
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      isSubmitting: false,
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
        this.setState({
          isSubmitting: true,
        });
      }
    });
  }

  render() {
    const {
      form,
      hasFound,
      hasLoaded,
      isFetching,
    } = this.props;

    const {
      isSubmitting,
    } = this.state;

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

          <ProgressDiag />
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hasFound:   state.accountReducer.hasFound,
    hasLoaded:  state.accountReducer.hasLoaded,
    isFetching: state.accountReducer.isFetching,
    progress:   state.accountReducer.progress,
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
