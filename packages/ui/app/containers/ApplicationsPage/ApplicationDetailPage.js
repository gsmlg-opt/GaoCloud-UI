/**
 *
 * Create Application Page
 *
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Helmet from '../../components/Helmet/Helmet.js';

import {
  makeSelectURL,
  makeSelectCurrentID,
  makeSelectCurrent,
} from '../../ducks/applications/selectors.js';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from '../../ducks/namespaces/selectors.js';
import * as actions from '../../ducks/applications/actions.js';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import dayjs from 'dayjs';
import messages from './messages';
import useStyles from './styles';
import ApplicationsTable from './ApplicationsTable';

export const ApplicationDetailPage = ({
  data,
  filter,
  clusterID,
  namespaceID,
  url,
  readApplication,
  application,
  applicationID,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      readApplication(applicationID, {
        url: `${url}/${applicationID}`,
        clusterID,
        namespaceID,
      });
    }
    const t = setInterval(
      () =>
        readApplication(applicationID, {
          url: `${url}/${applicationID}`,
          clusterID,
          namespaceID,
        }),
      3000
    );
    return () => clearInterval(t);
  }, [applicationID, clusterID, namespaceID, readApplication, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/applications`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.applicationDetail} />,
            },
          ]}
        />
        <Typography component="div" className="">
          <GridContainer className={classes.tagWrap}>
            <GridItem xs={6} sm={6} md={6}>
              <p className={classes.tag}>
                Version {application.get('chartVersion')}
              </p>
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
              <p className={classes.tag}>
                Created at{' '}
                {dayjs(application.get('creationTimestamp')).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}{' '}
              </p>
            </GridItem>
          </GridContainer>
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.quotasList} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <ApplicationsTable />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  applicationID: makeSelectCurrentID(),
  application: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ApplicationDetailPage);
