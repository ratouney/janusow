import React, { Component } from 'react';
import {
  Modal,
} from 'antd';
import SelectForm from './SelectForm';

class ModalSelectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  handleOk = (e) => {
    
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    
    this.setState({
      visible: false,
    });
  }

  render() {
    const {
      title = 'Select User',
      close,
      okText = 'Ok',
      cancelText = 'Cancel',
    } = this.props;

    const {
      visible,
    } = this.state;

    return (
      <Modal
        visible={visible}
        title={title}
        close={close}
        okText={okText}
        cancelText={cancelText}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <SelectForm />
      </Modal>
    );
  }
}

export default ModalSelectForm;
