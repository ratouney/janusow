import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  Row,
  Col,
} from 'antd';
import DashboardLayout from '../../modules/DashboardLayout';
import {
  SettingsForm,
  editSettings,
} from '../../modules/Settings/';
import { ThemeColorForm } from '../../modules/ThemeColor/';

class SettingsPage extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    const {
      settings,
      onEditSettings,
    } = this.props;

    return (
      <DashboardLayout>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              title="Change Settings"
            >
              <SettingsForm
                onSubmit={onEditSettings}
                settings={settings}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Manage Settings"
            >
              <ThemeColorForm />
              <Button style={{ marginBottom: 5 }}>
              Clear account data
              </Button>
              <br />
              <Button style={{ marginBottom: 5 }}>
              Clear account list
              </Button>
              <br />
              <Button style={{ marginBottom: 5 }}>
              Export config
              </Button>
              <br />
              <Button style={{ marginBottom: 5 }}>
              Import config
              </Button>
            </Card>
          </Col>
        </Row>
      </DashboardLayout>
    );
  }
}

function mapStateToProps(state) {
  console.log('State : ', state);
  return {
    settings: state.settingsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEditSettings: (newSettings) => {
      dispatch(editSettings(newSettings));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
