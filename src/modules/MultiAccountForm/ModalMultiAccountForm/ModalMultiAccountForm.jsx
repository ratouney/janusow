import React, { Component } from 'react';
import {
  Modal,
  Alert,
} from 'antd';
import { MultiAccountForm } from '../';

class ModalMultiAccountForm extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      visible,
      onCancel,
      errors = [],
    } = this.props;

    return (
      <Modal
        visible={visible}
        onCancel={() => { onCancel(); }}
        footer={errors && errors.length > 0 ? (
          <Alert
            message={errors[0]}
            type="error"
            closable
          />
        ) : null}
      >
        <MultiAccountForm
          inModal
        />
      </Modal>
    );
  }
}

export default ModalMultiAccountForm;
