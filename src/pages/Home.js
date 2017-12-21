import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Card,
  Input,
  Button,
} from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 'en',
    };
  }

  componentDidMount() {
    // stuff
  }
  render() {
    const {
      intl,
      onSetLanguage,
    } = this.props;


    console.log('Intl : ', intl);

    return (
      <Card>
        {intl.formatMessage({ id: 'hello' })}
        <Input
          onChange={(e) => { this.setState({ language: e.target.value }); }}
          placeholder={this.state.language}
        />
        <Button onClick={() => { onSetLanguage(this.state.language); }}>
          Apply language
        </Button>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetLanguage: (value) => {
      dispatch({ type: 'settings/SET_LANGUAGE', code: value });
    },
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Home));
