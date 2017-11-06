import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
} from 'antd';
import ProgressDiag from './ProgressDiag';
import { AccountForm } from '../AccountForm/';

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
      searchStep,
    } = this.props;

    console.log('Search Step : ', searchStep);
    return (
      <Row>
        <Card title="Select your account" style={{ marginBottom: 15 }} >
          <AccountForm
            userData={{}}
          />
        </Card>

        {
          searchStep > 0 ?
            <Card title="Query progress" >
              <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                <ProgressDiag direction="horizontal" />
              </Col>

              <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                <ProgressDiag direction="vertical" />
              </Col>
            </Card>
            : ''
        }
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchStep: state.accountReducer.searchStep,
  };
}

export default connect(mapStateToProps)(SelectUser);
