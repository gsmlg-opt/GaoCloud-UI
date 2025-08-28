/**
 *
 * ConfigMapsPage
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@mui/styles.js';
import { Link } from 'react-router-dom';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import Paper from '@mui/material/Paper.js';
// import SwipeableViews from 'react-swipeable-views';
import Tabs from '@mui/material/Tabs.js';
import Tab from '@mui/material/Tab.js';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import Helmet from 'components/Helmet/Helmet.js';

import * as sActions from '../../../app/ducks/serviceNetworks/actions';
import * as pActions from '../../../app/ducks/podNetworks/actions';
import * as nActions from '../../../app/ducks/nodeNetworks/actions';
import {
  makeSelectCurrentID as makeSelectClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from '../../../app/ducks/clusters/selectors';
import {
  makeSelectServiceNetworksList,
  makeSelectURL as makeSelectServiceNetworksURL,
} from '../../../app/ducks/serviceNetworks/selectors';
import {
  makeSelectPodNetworksList,
  makeSelectURL as makeSelectPodNetworksURL,
} from '../../../app/ducks/podNetworks/selectors';
import {
  makeSelectNodeNetworksList,
  makeSelectURL as makeSelectNodeNetworksURL,
} from '../../../app/ducks/nodeNetworks/selectors';

import messages from './messages';
import useStyles from './styles';
import Node from './Node';
import ServiceTable from './ServiceTable';
import PodsList from './PodsList';

const NetworkPage = ({
  clusterID,
  loadServiceNetworks,
  loadPodNetworks,
  loadNodeNetworks,
  serviceNetworks,
  podNetworks,
  nodeNetworks,
  serviceUrl,
  podUrl,
  nodeUrl,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    let t = null;
    if (podUrl) {
      loadPodNetworks(podUrl, { clusterID });
      t = setInterval(() => {
        loadPodNetworks(podUrl, { clusterID });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadPodNetworks, podUrl]);

  useEffect(() => {
    let t = null;
    if (serviceUrl) {
      loadServiceNetworks(serviceUrl, { clusterID });
      t = setInterval(() => {
        loadServiceNetworks(serviceUrl, { clusterID });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadServiceNetworks, serviceUrl]);

  useEffect(() => {
    let t = null;
    if (nodeUrl) {
      loadNodeNetworks(nodeUrl, { clusterID });
      t = setInterval(() => {
        loadNodeNetworks(nodeUrl, { clusterID });
      }, 3000);
    }
    return () => {
      clearInterval(t);
    };
  }, [clusterID, loadNodeNetworks, nodeUrl]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/network`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4 className={classes.customCardHeaderH4}>
                  <Tabs
                    value={tab}
                    onChange={(evt, val) => setTab(val)}
                    textColor="inherit"
                    classes={{
                      indicator: classes.indicator,
                    }}
                  >
                    <Tab label={<FormattedMessage {...messages.podIP} />} />
                    <Tab label={<FormattedMessage {...messages.serviceIP} />} />
                  </Tabs>
                </h4>
              </CardHeader>
              <CardBody>
                {tab === 0 ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <PodsList
                        data={podNetworks}
                        nodeNetworks={nodeNetworks}
                      />
                    </GridItem>
                  </GridContainer>
                ) : (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <ServiceTable data={serviceNetworks} />
                    </GridItem>
                  </GridContainer>
                )}
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
  serviceNetworks: makeSelectServiceNetworksList(),
  podNetworks: makeSelectPodNetworksList(),
  nodeNetworks: makeSelectNodeNetworksList(),
  serviceUrl: makeSelectServiceNetworksURL(),
  podUrl: makeSelectPodNetworksURL(),
  nodeUrl: makeSelectNodeNetworksURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...sActions,
      ...pActions,
      ...nActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NetworkPage);
