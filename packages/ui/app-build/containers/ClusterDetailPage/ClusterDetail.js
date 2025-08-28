/**
 *
 * ClusterDetailPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import dayjs from 'dayjs';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import NameIcon from 'components/Icons/Name.js';
import VersionIcon from 'components/Icons/Version.js';
import NodesIcon from 'components/Icons/Nodes.js';
import TimeIcon from 'components/Icons/Time.js';
import CircleChart from 'components/Charts/Circle.js';

import {
  makeSelectShowMenuText,
  makeSelectShowEvents,
} from '../../../app/ducks/app/selectors';

import useStyles from './styles';
import messages from './messages';

export const ClusterDetail = ({ cluster }) => {
  const classes = useStyles();
  const cpuRatio = (cluster.get('cpuUsedRatio') * 100).toFixed(0);
  const memoryRatio = (cluster.get('memoryUsedRatio') * 100).toFixed(0);
  const podRatio = (cluster.get('podUsedRatio') * 100).toFixed(0);
  const cpu = `${(cluster.get('cpuUsed') / 1000).toFixed(2)} / ${cluster.get(
    'cpu'
  ) / 1000}`;
  const memory = `${(cluster.get('memoryUsed') / 1024 ** 3).toFixed(2)}GiB / ${(
    cluster.get('memory') /
    1024 ** 3
  ).toFixed(2)}GiB`;
  const pod = `${cluster.get('podUsed')} / ${cluster.get('pod')}`;

  const infoList = [
    {
      key: 'name',
      Icon: NameIcon,
      message: 'clusterName',
      value: cluster.get('name'),
    },
    {
      key: 'version',
      Icon: VersionIcon,
      message: 'clusterVersion',
      value: cluster.get('version'),
    },
    {
      key: 'nodeCount',
      Icon: NodesIcon,
      message: 'clusterNodes',
      value: cluster.get('nodeCount'),
    },
    {
      key: 'creationTimestamp',
      Icon: TimeIcon,
      message: 'clusterCreated',
      value: dayjs(cluster.get('creationTimestamp')).format('YYYY-MM-DD'),
    },
  ];

  return (
    <div className={classes.wrapper}>
      <GridContainer className={classes.contentGrid}>
        <Card className={classes.card}>
          <CardHeader className={classes.infoCardHeader}>
            {infoList.map((info) => (
              <GridItem xs={3} sm={3} md={3} key={info.key}>
                <div className={classes.infoCardText}>
                  <p className={classes.info}>
                    <FormattedMessage {...messages[info.message]} />
                  </p>
                  <h3 className={classes.info}>{info.value}</h3>
                </div>
              </GridItem>
            ))}
          </CardHeader>
        </Card>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.card}>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={cpuRatio} total={100} />
            </CardHeader>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.clusterCPU} />
                <span className={classes.cardTitleValue}>
                  {cpu}
                  <FormattedMessage {...messages.clusterCPUCore} />
                </span>
              </h4>
            </CardBody>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4} style={{padding:0}}>
          <Card chart className={classes.card}>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={memoryRatio} total={100} />
            </CardHeader>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.clusterMemory} />
                <span className={classes.cardTitleValue}>{memory}</span>
              </h4>
            </CardBody>
            <CardFooter />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.card}>
            <CardHeader color="azure" className={classes.cardHeaderLine}>
              <CircleChart value={podRatio} total={100} />
            </CardHeader>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>
                <FormattedMessage {...messages.clusterPods} />
                <span className={classes.cardTitleValue}>{pod}</span>
              </h4>
            </CardBody>
            <CardFooter />
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  showMenuText: makeSelectShowMenuText(),
  showEvents: makeSelectShowEvents(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ClusterDetail);
