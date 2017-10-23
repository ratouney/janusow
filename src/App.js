import React, { Component } from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Homepage from './pages/Home/';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log('Mounted');
  }

  render() {
    return (
      <div>
        <Homepage />
      </div>
    );
  }
}

export default withRouter(App);
