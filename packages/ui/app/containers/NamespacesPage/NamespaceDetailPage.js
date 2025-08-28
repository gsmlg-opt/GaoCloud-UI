/**
 *
 * NamespaceDetailPage
 *
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import CssBaseline from '@mui/material/CssBaseline';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import Helmet from '../../components/Helmet/Helmet.js';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../ducks/clusters/selectors.js';
import {
  makeSelectCurrentID as makeSelectCurrentNamespaceID,
  makeSelectURL,
} from '../../ducks/namespaces/selectors.js';
import {
  makeSelectResourceQuotas,
  makeSelectURL as makeSelectResourceQuotasURL,
} from '../../ducks/resourceQuotas/selectors.js';
import * as actions from '../../ducks/namespaces/actions.js';
import * as rqActions from '../../ducks/resourceQuotas/actions.js';

import ResourceQuota from './ResourceQuota';
import messages from './messages';
import useStyles from './styles';

export const NamespaceDetailPage = ({
  clusterID,
  namespaceID,
  url,
  readNamespace,
  resourceQuotasUrl,
  readResourceQuota,
  resourceQuotas,
}) => {
  const classes = useStyles();
  const resourceQuota = resourceQuotas.get(namespaceID) || resourceQuotas.clear();
  useEffect(() => {
    (async () => {
      await new Promise((resolve, reject) => {
        readNamespace(namespaceID, {
          url: `${url}/${namespaceID}`,
          clusterID,
          resolve,
          reject,
        });
      });
      readResourceQuota(namespaceID, {
        url: `${resourceQuotasUrl}/${namespaceID}`,
        clusterID,
        namespaceID,
      });
    })();
  }, [clusterID, namespaceID, resourceQuotasUrl, url, readNamespace, readResourceQuota]);

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
            {
              name: <FormattedMessage {...messages.namespaceDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.detail} />
                </h4>
              </CardHeader>
              <CardBody>
                <ResourceQuota resourceQuota={resourceQuota} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  url: makeSelectURL(),
  resourceQuotasUrl: makeSelectResourceQuotasURL(),
  resourceQuotas: makeSelectResourceQuotas(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...rqActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NamespaceDetailPage);
