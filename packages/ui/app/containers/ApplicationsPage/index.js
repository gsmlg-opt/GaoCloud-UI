/**
 *
 * ApplicationsPage
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import { SubmissionError, submit } from 'redux-form';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import getByKey from '../../../src/utils/getByKey.js';

import CssBaseline from '@mui/material/CssBaseline';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import Button from '@mui/material/Button';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from '../../ducks/namespaces/selectors.js';
import { makeSelectURL } from '../../ducks/applications/selectors.js';
import * as actions from '../../ducks/applications/actions.js';
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo.js';
import Helmet from '../../components/Helmet/Helmet.js';

import messages from './messages';
import useStyles from './styles';
import ApplicationsList from './ApplicationsList';
import SearchForm from './form/searchForm';

export const formName = 'searchApplicationsForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const SearchApplicationsForm = reduxForm({
  form: formName,
  validate,
})(SearchForm);

const ApplicationsPage = ({
  clusterID,
  namespaceID,
  url,
  loadApplications,
  submitForm,
  clearDeleteErrorInfo,
}) => {
  const classes = useStyles();
  const [filter, setFilter] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      loadApplications(url, { clusterID, namespaceID });
    }
    const t = setInterval(
      () => loadApplications(url, { clusterID, namespaceID }),
      3000
    );
    return () => clearInterval(t);
  }, [clusterID, loadApplications, namespaceID, url]);

  const doSubmit = (formValues) => {
    setFilter(formValues.toJS());
  };

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
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
            <Card className={classes.card}>
              <GridContainer style={{ marginBottom: '20px' }}>
                <GridItem xs={3} sm={3} md={3}>
                  <SearchApplicationsForm onSubmit={doSubmit} />
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    style={{ marginTop: '10px' }}
                  >
                    <FormattedMessage {...messages.searchApplicationsButton} />
                  </Button>
                </GridItem>
              </GridContainer>
              <ApplicationsList filter={filter} />
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ApplicationsPage);
