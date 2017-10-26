import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Steps,
} from 'antd';
import { resetSearchSteps } from './actions';

const { Step } = Steps;

class ProgressDiag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          key:   '1',
          title: 'Search Query',
          wait:  'Checking if User can be found',
          error: 'Query failed',
        },
        {
          key:   '2',
          title: 'User Check',
          wait:  'User found!',
          error: 'User could not be found',
        },
        {
          key:   '3',
          title: 'Fetch Data',
          wait:  'Fetching profile data',
          error: 'Profile could not be fetched',
        },
        {
          key:   '4',
          title: 'Save Data',
          wait:  'Saving data',
          error: 'Data could not be saved',
        },
      ],
    };
  }

  componentDidMount() {
    this.props.onMountReset();
  }

  render() {
    const {
      direction = 'vertical',
      searchError,
      searchStep,
    } = this.props;

    const {
      steps,
    } = this.state;

    if (searchStep === 0) {
      return (
        ''
      );
    }

    return (
      <Steps
        direction={direction}
        current={searchError ? searchStep - 1 : searchStep}
        status={searchError ? 'error' : 'wait'}
      >
        {
          steps.map((elem, index) => {
            const ind = index + 1;

            return (
              <Step
                key={ind}
                title={elem.title}
                description={searchStep === ind && searchError ? elem.error : elem.wait}
              />
            );
          })
        }

      </Steps>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchStep:  state.accountReducer.searchStep,
    searchError: state.accountReducer.searchError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMountReset: () => {
      dispatch(resetSearchSteps());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressDiag);
