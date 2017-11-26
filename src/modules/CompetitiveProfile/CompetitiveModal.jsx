import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
} from 'antd';
import { closeModal } from './duck-reducer';
import { HeroCard } from '../HeroCard';

class CompetitiveModal extends Component {
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
        closable={false}
        visible={showModal}
        onCancel={onCloseModal}
        footer={null}
        width="750px"
        height="750px"
        className={`${selected.hero}Card`}
      >
        <HeroCard data={selected} />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.competitiveReducer.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseModal: () => {
      dispatch(closeModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitiveModal);
