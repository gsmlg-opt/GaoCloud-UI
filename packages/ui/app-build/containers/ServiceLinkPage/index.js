/**
 *
 * Service Link Page
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import Paper from '@mui/material/Paper.js';
import Tabs from '@mui/material/Tabs.js';
import Tab from '@mui/material/Tab.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import Helmet from 'components/Helmet/Helmet.js';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from '../../../app/ducks/namespaces/selectors';
import * as iActions from '../../../app/ducks/innerServices/actions';
import * as oActions from '../../../app/ducks/outerServices/actions';
import { makeSelectURL as makeSelectInnerUrl } from '../../../app/ducks/innerServices/selectors';
import { makeSelectURL as makeSelectOuterUrl } from '../../../app/ducks/outerServices/selectors';

import messages from './messages';
import useStyles from './styles';
import InnerCharts from './InnerCharts';
import OuterCharts from './OuterCharts';

export const ServiceLinkPage = ({
  clusterID,
  namespaceID,
  loadInnerServices,
  loadOuterServices,
  innerUrl,
  outerUrl,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  useEffect(() => {
    switch (tab) {
      case 0:
        if (outerUrl) loadOuterServices(outerUrl, { clusterID, namespaceID });
        break;
      case 1:
        if (innerUrl) loadInnerServices(innerUrl, { clusterID, namespaceID });
        break;
      // no default
    }
  }, [
    tab,
    outerUrl,
    innerUrl,
    loadOuterServices,
    clusterID,
    namespaceID,
    loadInnerServices,
  ]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/serviceLink`,
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
                    onChange={(evt, idx) => setTab(idx)}
                    textColor="inherit"
                    classes={{
                      indicator: classes.indicator,
                    }}
                  >
                    <Tab
                      label={<FormattedMessage {...messages.outerServices} />}
                    />
                    <Tab
                      label={<FormattedMessage {...messages.innerServices} />}
                    />
                  </Tabs>
                </h4>
              </CardHeader>
              <CardBody>
                {tab === 0 ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <OuterCharts />
                    </GridItem>
                  </GridContainer>
                ) : (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InnerCharts />
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
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  innerUrl: makeSelectInnerUrl(),
  outerUrl: makeSelectOuterUrl(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...iActions,
      ...oActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ServiceLinkPage);
