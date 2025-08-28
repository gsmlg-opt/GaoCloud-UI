/**
 *
 * WorkFlowsPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import Helmet from '../../components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '../../components/Icons/Add.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import { makeSelectURL } from '../../ducks/workFlows/selectors.js';
import * as actions from '../../ducks/workFlows/actions.js';

import useStyles from './styles';
import messages from './messages';
import WorkFlowsTable from './Table';

const WorkFlowsPage = ({
  clusterID,
  namespaceID,
  location,
  url,
  loadWorkFlows,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadWorkFlows(url, {
        clusterID,
        namespaceID,
      });
    }
    const t = setInterval(() => {
      if (url) {
        loadWorkFlows(url, {
          clusterID,
          namespaceID,
        });
      }
    }, 3000);

    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadWorkFlows, namespaceID, url]);


  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.workFlows } />
                  <Link
                    to={`${location.pathname}/create`}
                    className={classes.createBtnLink}
                  >
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Link>
                </h4>
              </CardHeader>
              <CardBody>
                <WorkFlowsTable />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch,
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(WorkFlowsPage);
