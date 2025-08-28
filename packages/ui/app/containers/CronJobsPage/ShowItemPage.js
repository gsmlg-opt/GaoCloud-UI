/**
 *
 * CronJobDetailPage
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import Helmet from '../../components/Helmet/Helmet.js';
import { withStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from '../../ducks/namespaces/selectors.js';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from '../../ducks/cronJobs/selectors.js';
import * as podsActions from '../../ducks/pods/actions.js';
import * as actions from '../../ducks/cronJobs/actions.js';
import PodsTable from '../PodsPage/PodsTable.js';

import CronJob from './Item';
import messages from './messages';
import useStyles from './styles';

export const CronJobDetailPage = ({
  clusterID,
  namespaceID,
  cronJobID,
  cronJob,
  url,
  loadCJPods: loadPods,
  readCronJob,
}) => {
  const classes = useStyles();
  const podUrl = cronJob.getIn(['links', 'pods']);
  useEffect(() => {
    const loadCronJobAndPods = () => {
      readCronJob(cronJobID, {
        clusterID,
        namespaceID,
        url: `${url}/${cronJobID}`,
      });
      if (podUrl) {
        loadPods(podUrl, { clusterID, namespaceID, cronJobID });
      }
    };
    loadCronJobAndPods();
    const timer = setInterval(loadCronJobAndPods, 3000);

    return () => clearInterval(timer);
  }, [url, podUrl, readCronJob, cronJobID, clusterID, namespaceID, loadPods]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/cronJobs`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.cronJobDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <CronJob cronJob={cronJob} />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pods} />
                </h4>
              </CardHeader>
              <CardBody>
                <PodsTable parentType="cj" />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  cronJobID: makeSelectCurrentID(),
  url: makeSelectURL(),
  cronJob: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...podsActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CronJobDetailPage);
