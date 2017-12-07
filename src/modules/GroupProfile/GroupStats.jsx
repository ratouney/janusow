import React, { Component } from 'react';
import { connect } from 'react-redux';
import _, { round, sum, sortBy, capitalize } from 'lodash';
import {
  Card,
  Row,
  Col,
  Button,
  Switch,
  Table,
} from 'antd';
import {
  HERO_NAMES,
} from '../../utils/consts/';
import {
  Group,
  playtimeToMinute,
} from '../../utils/ApiParse/';
import getHeroColors from '../../utils/getHeroColors';

const heroColors = getHeroColors(document);

const cardTitleSpan = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
};

const CardTitle = ({ groupData, showCompetitive, handleSwitch }) => {
  return (
    <Row>
      <Col {...cardTitleSpan}>
        {`You played ${showCompetitive ? Group.competitivePlaytime(groupData) : Group.quickplayPlaytime(groupData)} hours ${showCompetitive ? 'this season' : 'in QuickPlay'}`}
      </Col>
      <Col {...cardTitleSpan}>
        <Switch
          checked={showCompetitive}
          onChange={() => { return handleSwitch(); }}
          checkedChildren="Competitive"
          unCheckedChildren="QuickPlay"
        />
      </Col>
    </Row>
  );
};

class GroupStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCompetitive: true,
    };
  }

  handleSwitch() {
    this.setState({
      showCompetitive: !this.state.showCompetitive,
    });
  }

  render() {
    const {
      group,
      accountData,
    } = this.props;

    const {
      showCompetitive,
    } = this.state;

    const groupData = accountData.filter((elem) => {
      return group.keys.includes(elem.fullname);
    });

    let competitiveData;
    let quickplayData;

    if (showCompetitive) {
      competitiveData = Group.combineCompetitive(Group.competitiveData(groupData));
    } else {
      quickplayData = Group.combineQuickplay(Group.quickplayData(groupData));
    }

    const columns = [
      {
        title:     'Hero',
        dataIndex: 'hero',
        width:     '120px',
        render:    (value) => {
          return (
            <div style={{
              color:           heroColors[value].color,
              backgroundColor: heroColors[value].backgroundColor,
            }}
            >
              {capitalize(value)}
            </div>
          );
        },
      },
      {
        width:     '80px',
        title:     'Playtime',
        dataIndex: 'playtime',
        render:    (value) => {
          return (
            <span>
              {value} hours
            </span>
          );
        },
      },
    ];

    return (
      <Card
        title={<CardTitle groupData={groupData} showCompetitive={showCompetitive} handleSwitch={() => { this.setState({ showCompetitive: !this.state.showCompetitive }); }} />}
        bordered={false}
      >
        <Table
          dataSource={showCompetitive ? competitiveData : quickplayData}
          columns={columns}
          size="small"
        />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountData: state.accountReducer.accountData,
  };
}

export default connect(mapStateToProps)(GroupStats);
