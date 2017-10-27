import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import './theme/index.less';

class App extends Component {
  componentDidMount() {

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

export default withRouter(App);
