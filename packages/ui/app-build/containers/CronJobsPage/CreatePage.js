/**
 *
 * Create Cronjob Page
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable.js';
import parseCmd from '../../../src/utils/parseCmd';

import { usePush } from 'hooks/router.js';

import Helmet from 'components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline.js';
import Button from '@mui/material/Button.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import { makeSelectURL } from '../../../app/ducks/cronJobs/selectors';
import * as actions from '../../../app/ducks/cronJobs/actions';
import * as sActions from '../../../app/ducks/secrets/actions';
import {
  makeSelectSecrets,
  makeSelectURL as makeSelectSecretURL,
} from '../../../app/ducks/secrets/selectors';
import * as cActions from '../../../app/ducks/configMaps/actions';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from '../../../app/ducks/configMaps/selectors';

import messages from './messages';
import useStyles from './styles';
import CreateCronjobForm, { formName } from './CreateForm';

export const CreateCronjobPage = ({
  createCronJob,
  submitForm,
  url,
  clusterID,
  namespaceID,
  values,
  secrets,
  configMaps,
  configMapURL,
  loadConfigMaps,
  secretURL,
  loadSecrets,
}) => {
  const classes = useStyles();
  const push = usePush();

  useEffect(() => {
    if (configMapURL) {
      loadConfigMaps(configMapURL, { clusterID, namespaceID });
    }
    if (secretURL) {
      loadSecrets(secretURL, { clusterID, namespaceID });
    }
  }, [
    clusterID,
    configMapURL,
    loadConfigMaps,
    loadSecrets,
    namespaceID,
    secretURL,
  ]);
  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const { containers } = data;
      containers.forEach((item) => {
        if (item && item.args) {
          item.args = parseCmd(item.args);
        }
        if (item && item.command) {
          item.command = parseCmd(item.command);
        }
        return item;
      });
      await new Promise((resolve, reject) => {
        createCronJob(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/cronJobs`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet
        title={messages.createPageTitle}
        description={messages.createPageDesc}
      />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/cronJobs`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateCronjobForm
              onSubmit={doSubmit}
              formValues={values}
              configMaps={configMaps}
              secrets={secrets}
              initialValues={fromJS({
                replicas: 1,
                containers: [{ name: '' }],
              })}
            />
            <div className={classes.buttonGroup}>
              <Button variant="contained" color="primary" onClick={submitForm}>
                <FormattedMessage {...messages.save} />
              </Button>
              <Button
                variant="contained"
                className={classes.cancleBtn}
                onClick={() => {
                  push(
                    `/clusters/${clusterID}/namespaces/${namespaceID}/cronJobs`
                  );
                }}
              >
                <FormattedMessage {...messages.cancle} />
              </Button>
            </div>
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
  values: getFormValues(formName),
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  secrets: makeSelectSecrets(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateCronjobPage);
