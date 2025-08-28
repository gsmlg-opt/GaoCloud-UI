/**
 *
 * NodeDetailPage
 *
 */

import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import dayjs from 'dayjs';

import { withStyles } from '@mui/styles.js';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import Table from '@mui/material/Table.js';
import TableBody from '@mui/material/TableBody.js';
import TableCell from '@mui/material/TableCell.js';
import TableHead from '@mui/material/TableHead.js';
import TableRow from '@mui/material/TableRow.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';
import CircleChart from 'components/Charts/Circle.js';
import Helmet from 'components/Helmet/Helmet.js';

import {
  makeSelectCurrentID as makeSelectCurrentClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from '../../../app/ducks/clusters/selectors';
import {
  makeSelectCurrent,
  makeSelectURL,
  makeSelectCurrentID,
} from '../../../app/ducks/nodes/selectors';
import * as actions from '../../../app/ducks/nodes/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import messages from './messages';
import useStyles from './styles';

export const NodeDetailPage = ({ clusterID, url, readNode, node, nodeID }) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      readNode(nodeID, {
        clusterID,
        url: `${url}/${nodeID}`,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, nodeID, readNode, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/nodes`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              path: '#',
              name: <FormattedMessage {...messages.nodeDetails} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card  className={classes.cardMargin}>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.nodeInfo} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.nodeName} />}
                      fullWidth
                      value={node.get('name')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.address} />}
                      fullWidth
                      value={node.get('address')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.roles} />}
                      fullWidth
                      value={node.get('roles') && node.get('roles').join(', ')}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.dockerVersion} />
                      }
                      fullWidth
                      value={node.get('dockerVersion')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.operatingSystemImage} />
                      }
                      fullWidth
                      value={node.get('operatingSystemImage')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.operatingSystem} />
                      }
                      fullWidth
                      value={node.get('operatingSystem')}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.creationTimestamp} />
                      }
                      fullWidth
                      value={dayjs(node.get('creationTimestamp')).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                      <CardHeader
                        color="azure"
                        className={classes.cardHeaderLine}
                      >
                        <CircleChart
                          value={node.get('cpuUsedRatio') * 100}
                          total={100}
                        />
                      </CardHeader>
                      <CardBody>
                        <h4 className={classes.cardTitle}>
                          <FormattedMessage {...messages.cpu} />
                          <span className={classes.cardTitleValue}>
                            {`${node.get('cpuUsed') / 1000} / ${node.get(
                              'cpu'
                            ) / 1000}`}
                          </span>
                        </h4>
                        <p className={classes.cardCategory} />
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                      <CardHeader
                        color="azure"
                        className={classes.cardHeaderLine}
                      >
                        <CircleChart
                          value={node.get('memoryUsedRatio') * 100}
                          total={100}
                        />
                      </CardHeader>
                      <CardBody>
                        <h4 className={classes.cardTitle}>
                          <FormattedMessage {...messages.memory} />
                          <span className={classes.cardTitleValue}>
                            {`${(node.get('memoryUsed') / 1024 ** 3).toFixed(
                              2
                            )} / ${(node.get('memory') / 1024 ** 3).toFixed(
                              2
                            )} GiB`}
                          </span>
                        </h4>
                        <p className={classes.cardCategory} />
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                      <CardHeader
                        color="azure"
                        className={classes.cardHeaderLine}
                      >
                        <CircleChart
                          value={node.get('podUsedRatio') * 100}
                          total={100}
                        />
                      </CardHeader>
                      <CardBody>
                        <h4 className={classes.cardTitle}>
                          <FormattedMessage {...messages.pods} />
                          <span className={classes.cardTitleValue}>
                            {`${node.get('podUsed')} / ${node.get('pod')}`}
                          </span>
                        </h4>
                        <p className={classes.cardCategory} />
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.cardMargin}>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.labels} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <FormattedMessage {...messages.key} />
                      </TableCell>
                      <TableCell>
                        <FormattedMessage {...messages.value} />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {node.get('labels') &&
                      node
                        .get('labels')
                        .map((val, key) => (
                          <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{val}</TableCell>
                          </TableRow>
                        ))
                        .toList()}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.annotations} />
                </h4>
              </CardHeader>
              <CardBody>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <FormattedMessage {...messages.key} />
                      </TableCell>
                      <TableCell>
                        <FormattedMessage {...messages.value} />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {node.get('annotations') &&
                      node
                        .get('annotations')
                        .map((val, key) => (
                          <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{`${val}`}</TableCell>
                          </TableRow>
                        ))
                        .toList()}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cluster: makeSelectCurrentCluster(),
  clusterID: makeSelectCurrentClusterID(),
  node: makeSelectCurrent(),
  url: makeSelectURL(),
  nodeID: makeSelectCurrentID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NodeDetailPage);
