import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
} from 'antd';
import { closeModal } from './duck-reducer';

class QuickPlayModal extends Component {
  componentDidMount() {
    // stuff
  }
  render() {
    const {
      showModal,
      onCloseModal,
      selected,
    } = this.props;

    return (
      <Modal
        visible={showModal}
        onCancel={onCloseModal}
        footer={null}
        width="750px"
        height="750px"
      >
        {JSON.stringify(selected)}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.quickPlayReducer.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlayModal);
