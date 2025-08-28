/**
 *
 * NodesPage
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import getByKey from '../../../src/utils/getByKey';

import { withStyles } from '@mui/styles.js';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import AddIcon from 'components/Icons/Add.js';
import Helmet from 'components/Helmet/Helmet.js';
import IconButton from '@mui/material/IconButton.js';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo.js';

import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from '../../../app/ducks/clusters/selectors';

import * as actions from '../../../app/ducks/nodes/actions';
import { makeSelectURL } from '../../../app/ducks/nodes/selectors';

import messages from './messages';
import useStyles from './styles';
import NodesTable from './Table';

const NodesPage = ({ clusterID, url, loadNodes }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (url) {
      loadNodes(url, {
        clusterID,
      });
    }
    const t = setInterval(() => {
      if (url) {
        loadNodes(url, {
          clusterID,
        });
      }
    }, 3000);
    return () => clearInterval(t);
  }, [clusterID, loadNodes, url]);

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
          ]}
        />
        <GridContainer className={classes.grid}>
          {error ? (
            <ErrorInfo
              errorText={getByKey(error, ['response', 'message'])}
              close={() => setError(null)}
            />
          ) : null}
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.nodes} />
                </h4>
              </CardHeader>
              <CardBody>
                <NodesTable setError={setError} />
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
  clusterID: makeSelectClusterID(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NodesPage);
