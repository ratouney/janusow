import React, { Component } from 'react';
import {
  Modal,
} from 'antd';
import { AccountForm } from '../../AccountForm/';

class NewAccountFormModal extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      visible = false,
      onCancel,
      footer = null,
      onSubmit,
    } = this.props;

    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={footer}
      >
        <AccountForm
          onSubmit={onSubmit}
          userData={{}}
        />
      </Modal>
    );
  }
}

export default NewAccountFormModal;
