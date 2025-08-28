/**
 *
 * UdpIngressDetailPage
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

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
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from '../../../app/ducks/udpIngresses/selectors';

import * as actions from '../../../app/ducks/udpIngresses/actions';

import UdpIngressRuleTable from './RuleTable';
import messages from './messages';
import useStyles from './styles';

export const UdpIngressDetailPage = ({
  clusterID,
  namespaceID,
  udpIngressID,
  udpIngress,
  url,
  readUdpIngress,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      readUdpIngress(udpIngressID, {
        clusterID,
        namespaceID,
        url: `${url}/${udpIngressID}`,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, namespaceID, readUdpIngress, udpIngressID, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/udpIngresses`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.udpIngressDetail} />,
            },
          ]}
        />

        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.udpIngressDetail} />
                </h4>
              </CardHeader>
              <CardBody>
                <UdpIngressRuleTable udpIngress={udpIngress} />
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
  udpIngressID: makeSelectCurrentID(),
  url: makeSelectURL(),
  udpIngress: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UdpIngressDetailPage);
