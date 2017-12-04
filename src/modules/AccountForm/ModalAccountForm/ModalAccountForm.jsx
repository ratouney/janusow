import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Alert,
} from 'antd';
import {
  close as closeModal,
} from './';
import { AccountForm } from '../';
import ProgressDiag from '../../SelectUser/ProgressDiag';

class ModalAccountForm extends Component {
  componentDidMount() {

  }

  render() {
    const {
      visible,
      overrideVisible = {
        do:    false,
        value: false,
      },
      onCloseModal,
      onCancel,
      userData,
      onSubmit,
      customModalProps,
      errors,
    } = this.props;

    return (
      <Modal
        visible={overrideVisible.do ? overrideVisible.value : visible}
        footer={errors && errors.length > 0 ? (
          <Alert
            message={errors[0]}
            type="error"
            closable
          />
        ) : null}
        onCancel={() => {
          if (onCancel) {
            return onCancel();
          }
          return onCloseModal();
        }}
        {...customModalProps}
      >
        <AccountForm
          userData={userData}
          onSubmit={onSubmit}
        />
        <ProgressDiag direction="vertical" />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    visible:  state.accountModalReducer.visible,
    userData: state.accountModalReducer.userData,
    errors:   state.accountReducer.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAccountForm);
