import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './theme/index.less';

class App extends Component {
  componentDidMount() {
    console.log('Mounted');
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
