/**
 *
 * DaemonSetDetailPage
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
} from '../../../app/ducks/daemonSets/selectors';
import * as podsActions from '../../../app/ducks/pods/actions';
import * as actions from '../../../app/ducks/daemonSets/actions';
import PodsTable from '../../../app/containers/PodsPage/PodsTable';

import Item from './Item';
import messages from './messages';
import useStyles from './styles';

export const DaemonSetDetailPage = ({
  clusterID,
  namespaceID,
  daemonSetID,
  daemonSet,
  url,
  loadDSPods: loadPods,
  readDaemonSet,
}) => {
  const classes = useStyles();
  const podUrl = daemonSet.getIn(['links', 'pods']);
  useEffect(() => {
    const loadDaemonSetAndPods = () => {
      readDaemonSet(daemonSetID, {
        clusterID,
        namespaceID,
        url: `${url}/${daemonSetID}`,
      });
      if (podUrl) {
        loadPods(podUrl, { clusterID, namespaceID, daemonSetID });
      }
    };
    loadDaemonSetAndPods();
    const timer = setInterval(loadDaemonSetAndPods, 3000);

    return () => clearInterval(timer);
  }, [
    url,
    podUrl,
    readDaemonSet,
    daemonSetID,
    clusterID,
    namespaceID,
    loadPods,
  ]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/daemonSets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.daemonSetDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <Item daemonSet={daemonSet} />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pods} />
                </h4>
              </CardHeader>
              <CardBody>
                <PodsTable parentType="ds" />
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
  daemonSetID: makeSelectCurrentID(),
  url: makeSelectURL(),
  daemonSet: makeSelectCurrent(),
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

export default compose(withConnect)(DaemonSetDetailPage);
