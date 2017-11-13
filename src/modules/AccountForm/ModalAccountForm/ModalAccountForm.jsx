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

class ModalAccountForm extends Component {
  componentDidMount() {

  }

  render() {
    const {
      visible,
      onCloseModal,
      userData,
      onSubmit,
      customModalProps,
      errors,
    } = this.props;

    return (
      <Modal
        visible={visible}
        footer={errors && errors.length > 0 ? (
          <Alert
            message={errors[0]}
            type="error"
            closable
          />
        ) : null}
        onCancel={() => { return onCloseModal(); }}
        {...customModalProps}
      >
        <AccountForm
          userData={userData}
          onSubmit={onSubmit}
        />

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
