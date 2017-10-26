import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Steps,
  Icon,
} from 'antd';

const { Step } = Steps;

class ProgressDiag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        { title: 'Exist', wait: 'Checking if User can be found', error: null },
        { title: 'Found', wait: 'User found!', error: 'User could not be found' },
      ],
    };
  }

  componentDidMount() {
    // stuff
  }

  render() {
    const {
      progress,
      direction = 'vertical',
    } = this.props;

    const error = progress < 0;

    console.log('Progress : ', progress);
    if (progress === 0) {
      return (
        ''
      );
    }
    // debugger;
    return (
      <Steps direction={direction} current={error ? -progress - 1 : progress} status={error ? 'error' : 'wait'}>
        <Step title="Exist" description="Checking if User can be found" />
        {
          progress === -2
            ? <Step title="Error" description="User could not be found" />
            : <Step title="Found" description="User found !" />
        }
        <Step title="Complete" description="Loading additional User data" />
        {
          progress === -4
            ? <Step title="Error" description="User could not be saved" />
            : <Step title="Saved" description="User saved to list" />
        }
      </Steps>
    );
  }
}

function mapStateToProps(state) {
  return {
    progress: state.accountReducer.progress,
  };
}

export default connect(mapStateToProps)(ProgressDiag);
