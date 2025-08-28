/**
 *
 * ClusterDetailPage
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import CssBaseline from '@mui/material/CssBaseline';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Helmet from '../../components/Helmet/Helmet.js';

import { makeSelectLastNamespace } from '../../ducks/app/selectors.js';
import * as appActions from '../../ducks/app/actions.js';
import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from '../../ducks/clusters/selectors.js';
import * as actions from '../../ducks/clusters/actions.js';
import { makeSelectNamespaces } from '../../ducks/namespaces/selectors.js';

import messages from './messages';
import useStyles from './styles';
import ClusterDetail from './ClusterDetail';

export const ClusterDetailPage = ({
  readCluster,
  cluster,
  id,
  url,
  lastNamespace,
  setLastNamespace,
  namespaces,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (!lastNamespace && namespaces.size > 0) {
      const ns = namespaces.first();
      setLastNamespace(ns.get('id'));
    }
  }, [lastNamespace, setLastNamespace, namespaces]);
  useEffect(() => {
    readCluster(id, { url: `${url}/${id}` });
    const t = setInterval(() => {
      readCluster(id, { url: `${url}/${id}` });
    }, 3000);
    return () => clearInterval(t);
  }, [id, readCluster, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${cluster.get('name')}`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <ClusterDetail cluster={cluster} />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cluster: makeSelectCurrent(),
  id: makeSelectCurrentID(),
  url: makeSelectURL(),
  lastNamespace: makeSelectLastNamespace(),
  namespaces: makeSelectNamespaces(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...appActions,
      ...actions,
      routeTo: push,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ClusterDetailPage);
