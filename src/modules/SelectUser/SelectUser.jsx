import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Row,
  Col,
  Card,
  Steps,
} from 'antd';
import { addNewUser } from './actions';
import ProgressDiag from './ProgressDiag';
import { SelectForm } from '../SelectForm/';

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
    return (
      <Card title="Select your account" >
        <Row>
          <SelectForm />

          <Col xs={0} sm={0} md={24} lg={24} xl={24}>
            <ProgressDiag direction="horizontal" />
          </Col>

          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <ProgressDiag direction="vertical" />
          </Col>
        </Row>
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectUser);
