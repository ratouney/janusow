import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './App.css';
import './theme/index.less';

class App extends Component {
  componentDidMount() {
    // some sutff will happen here
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps() {
  return {

  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
