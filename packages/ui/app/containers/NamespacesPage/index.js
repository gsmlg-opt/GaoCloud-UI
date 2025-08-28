/**
 *
 * NamespacesPage
 *
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Menubar from "../../components/Menubar/index.js";
import AddIcon from '../../components/Icons/Add.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import Helmet from '../../components/Helmet/Helmet.js';

import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from '../../ducks/clusters/selectors.js';
import { makeSelectURL } from '../../ducks/namespaces/selectors.js';
import * as actions from '../../ducks/namespaces/actions.js';

import messages from './messages';
import useStyles from './styles';
import NamespacesTable from './NamespacesTable';

export const NamespacesPage = ({ url, clusterID, loadNamespaces }) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadNamespaces(url, { clusterID });
    }
    const t = setInterval(() => {
      if (url) {
        loadNamespaces(url, { clusterID });
      }
    }, 3000);
    return () => clearInterval(t);
  }, [clusterID, loadNamespaces, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <Typography component="div">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.namespaces} />
                  </h4>
                  <IconButton
                    aria-label={<FormattedMessage {...messages.namespaces} />}
                    component={Link}
                    to={`/clusters/${clusterID}/namespaces/create`}
                    className={classes.createBtnLink}
                  >
                    <AddIcon />
                  </IconButton>
                </CardHeader>
                <CardBody>
                  <NamespacesTable />
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
  clusterID: makeSelectClusterID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NamespacesPage);
