/**
 *
 * SecretsPage
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '../../components/Icons/Add.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Helmet from '../../components/Helmet/Helmet.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import * as actions from '../../ducks/secrets/actions.js';
import { makeSelectURL } from '../../ducks/secrets/selectors.js';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import messages from './messages';
import useStyles from './styles';
import SecretsTable from './SecretsTable';

export const SecretsPage = ({
  clusterID,
  namespaceID,
  url,
  loadSecrets,
  location,
}) => {
  const classes = useStyles();
  useEffect(() => {
    let t = null;
    if (url) {
      loadSecrets(url, { clusterID, namespaceID });
      t = setInterval(() => {
        loadSecrets(url, { clusterID, namespaceID });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    }
  }, [clusterID, loadSecrets, namespaceID, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/secrets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.secrets} />
                </h4>
                <Link
                  to={`${location.pathname}/create`}
                  className={classes.createBtnLink}
                >
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Link>
              </CardHeader>
              <CardBody>
                <SecretsTable />
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

export default compose(withConnect)(SecretsPage);
