/**
 *
 * JobDetailPage
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import Helmet from 'components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import Fab from '@mui/material/Fab.js';
import AddIcon from '@mui/icons-material/Add.js';
import MinimizeIcon from '@mui/icons-material/Minimize.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from '../../../app/ducks/jobs/selectors';
import * as podsActions from '../../../app/ducks/pods/actions';
import * as actions from '../../../app/ducks/jobs/actions';
import PodsTable from '../../../app/containers/PodsPage/PodsTable';

import Item from './Item';
import messages from './messages';
import useStyles from './styles';

export const JobDetailPage = ({
  clusterID,
  namespaceID,
  jobID,
  job,
  url,
  loadJOBPods: loadPods,
  readJob,
}) => {
  const classes = useStyles();
  const podUrl = job.getIn(['links', 'pods']);
  useEffect(() => {
    const loadJobAndPods = () => {
      readJob(jobID, {
        clusterID,
        namespaceID,
        url: `${url}/${jobID}`,
      });
      if (podUrl) {
        loadPods(podUrl, { clusterID, namespaceID, jobID });
      }
    };
    loadJobAndPods();
    const timer = setInterval(loadJobAndPods, 3000);

    return () => clearInterval(timer);
  }, [url, podUrl, readJob, jobID, clusterID, namespaceID, loadPods]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/jobs`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.jobDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <Item job={job} />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pods} />
                </h4>
              </CardHeader>
              <CardBody>
                <PodsTable parentType="job" />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  jobID: makeSelectCurrentID(),
  url: makeSelectURL(),
  job: makeSelectCurrent(),
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

export default compose(withConnect)(JobDetailPage);
