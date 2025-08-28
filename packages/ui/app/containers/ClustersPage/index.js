/**
 *
 * ClustersPage
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import getByKey from '../../../src/utils/getByKey.js';

import { Link } from 'react-router-dom';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import IconButton from '@mui/material/IconButton';
import AddIcon from '../../components/Icons/Add.js';
import Helmet from '../../components/Helmet/Helmet.js';
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo.js';

import { makeSelectURL } from '../../ducks/clusters/selectors.js';
import * as actions from '../../ducks/clusters/actions.js';

import messages from './messages';
import useStyles from './styles';
import ClustersTable from './Table';

export const ClustersPage = ({ loadClusters, url }) => {
  const classes = useStyles();
  useEffect(() => {
    loadClusters(url);
    const t = setInterval(() => {
      loadClusters(url);
    }, 3000);
    return () => clearInterval(t);
  }, [loadClusters, url]);
  const [error, setError] = useState(null);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: '/clusters',
              name: <FormattedMessage {...messages.clusters} />,
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
                  <FormattedMessage {...messages.clusters} />
                </h4>
                <IconButton
                  component={Link}
                  to="/clusters/create"
                  className={classes.createBtnLink}
                >
                  <AddIcon />
                </IconButton>
              </CardHeader>
              <CardBody>
                <ClustersTable setError={setError} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(ClustersPage);
