/**
 *
 * StatefulSetDetailPage
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import Helmet from '../../components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from '../../ducks/statefulSets/selectors.js';
import * as podsActions from '../../ducks/pods/actions.js';
import * as actions from '../../ducks/statefulSets/actions.js';
import PodsTable from '../PodsPage/PodsTable.js';

import Item from './Item';
import messages from './messages';
import useStyles from './styles';

export const StatefulSetDetailPage = ({
  clusterID,
  namespaceID,
  statefulSetID,
  statefulSet,
  url,
  loadSTSPods: loadPods,
  readStatefulSet,
}) => {
  const classes = useStyles();
  const podUrl = statefulSet.getIn(['links', 'pods']);
  useEffect(() => {
    readStatefulSet(statefulSetID, {
      clusterID,
      namespaceID,
      url: `${url}/${statefulSetID}`,
    });
    const loadStatefulSetAndPods = () => {
      if (podUrl) {
        loadPods(podUrl, { clusterID, namespaceID, statefulSetID });
      }
    };
    loadStatefulSetAndPods();
    const timer = setInterval(loadStatefulSetAndPods, 3000);

    return () => clearInterval(timer);
  }, [
    url,
    podUrl,
    readStatefulSet,
    statefulSetID,
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
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/statefulSets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.statefulSetDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <Item statefulSet={statefulSet} />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pods} />
                </h4>
              </CardHeader>
              <CardBody>
                <PodsTable parentType="sts" />
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
  statefulSetID: makeSelectCurrentID(),
  url: makeSelectURL(),
  statefulSet: makeSelectCurrent(),
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

export default compose(withConnect)(StatefulSetDetailPage);
