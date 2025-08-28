/**
 *
 * Storages Page
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import getByKey from '../../../src/utils/getByKey';

import Helmet from 'components/Helmet/Helmet.js';
import { Link } from 'react-router-dom';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import Paper from '@mui/material/Paper.js';
import Tabs from '@mui/material/Tabs.js';
import Tab from '@mui/material/Tab.js';
import IconButton from '@mui/material/IconButton.js';
import ErrorInfo from 'components/ErrorInfo/ErrorInfo.js';
import AddIcon from 'components/Icons/Add.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';

import * as actions from '../../../app/ducks/storages/actions';
import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectURL } from '../../../app/ducks/storages/selectors';

import StoragesTable from './Table';
import messages from './messages';
import useStyles from './styles';

export const StoragesPage = ({ clusterID, loadStorages, url }) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadStorages(url, { clusterID });
    }
    const t = setInterval(() => loadStorages(url, { clusterID }), 3000);
    return () => clearInterval(t);
  }, [clusterID, loadStorages, url]);
  const [error, setError] = useState(null);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/storages`,
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
                  <FormattedMessage {...messages.storages} />
                </h4>
                <IconButton
                  component={Link}
                  to={`/clusters/${clusterID}/storages/create`}
                  className={classes.createBtnLink}
                >
                  <AddIcon />
                </IconButton>
              </CardHeader>
              <CardBody>
                <StoragesTable setError={setError} />
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

export default compose(withConnect)(StoragesPage);
