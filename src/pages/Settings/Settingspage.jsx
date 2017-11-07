import React, { Component } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
} from 'antd';
import DashboardLayout from '../../modules/DashboardLayout';
import { SettingsForm } from '../../modules/Settings/';

class SettingsPage extends Component {
  componentDidMount() {
    // stuff
  }

  render() {
    return (
      <DashboardLayout>
        <Row>
          <Col span={12} >
            <Card
              title="Change Settings"
            >
              <SettingsForm />
            </Card>
          </Col>
          <Col span={12} >
            <Card
              title="Manage Settings"
            >
              <Button style={{ marginBottom: 5 }} >
              Clear account data
              </Button>
              <br />
              <Button style={{ marginBottom: 5 }} >
              Clear account list
              </Button>
              <br />
              <Button style={{ marginBottom: 5 }} >
              Export config
              </Button>
              <br />
              <Button style={{ marginBottom: 5 }} >
              Import config
              </Button>
            </Card>
          </Col>
        </Row>
      </DashboardLayout>
    );
  }
}

export default SettingsPage;
