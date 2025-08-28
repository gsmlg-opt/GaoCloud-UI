/**
 *
 * PersistentVolumeClaimsPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import getByKey from '../../../src/utils/getByKey';

import Helmet from 'components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline.js';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography.js';
import Fab from '@mui/material/Fab.js';
import IconButton from '@mui/material/IconButton.js';
import AddIcon from 'components/Icons/Add.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import { makeSelectURL } from '../../../app/ducks/persistentVolumeClaims/selectors';
import * as actions from '../../../app/ducks/persistentVolumeClaims/actions';

import useStyles from './styles';
import messages from './messages';
import PersistentVolumeClaimsTable from './Table';

const PersistentVolumeClaimsPage = ({
  clusterID,
  namespaceID,
  location,
  url,
  loadPersistentVolumeClaims,
}) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  useEffect(() => {
    let t = null;
    if (url) {
      loadPersistentVolumeClaims(url, {
        clusterID,
        namespaceID,
      });
      t = setInterval(() => {
        loadPersistentVolumeClaims(url, {
          clusterID,
          namespaceID,
        });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadPersistentVolumeClaims, namespaceID, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters`,
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
                  <FormattedMessage {...messages.persistentVolumeClaims} />
                </h4>
              </CardHeader>
              <CardBody>
                <PersistentVolumeClaimsTable setError={setError} />
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

export default compose(withConnect, memo)(PersistentVolumeClaimsPage);
