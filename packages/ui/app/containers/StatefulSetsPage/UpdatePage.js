/**
 *
 * Update StatefulSet Page
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
} from 'redux-form/immutable';
import parseCmd from '../../../src/utils/parseCmd.js';

import { usePush } from 'hooks/router';

import list2str from '../../../src/utils/list2str.js';

import Helmet from '../../components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from '../../ducks/statefulSets/selectors.js';
import * as sActions from '../../ducks/secrets/actions.js';
import {
  makeSelectSecrets,
  makeSelectURL as makeSelectSecretURL,
} from '../../ducks/secrets/selectors.js';
import * as cActions from '../../ducks/configMaps/actions.js';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from '../../ducks/configMaps/selectors.js';
import {
  makeSelectStorageClasses,
  makeSelectURL as makeSelectStorageClassesURL,
} from '../../ducks/storageClasses/selectors.js';
import * as storagesAction from '../../ducks/storageClasses/actions.js';
import * as actions from '../../ducks/statefulSets/actions.js';

import messages from './messages';
import useStyles from './styles';
import StatefulSetForm, { formName } from './CreateForm';

export const UpdateStatefulSetPage = ({
  updateStatefulSet,
  readStatefulSet,
  submitForm,
  url,
  clusterID,
  namespaceID,
  id,
  current,
  values,
  configMaps,
  secrets,
  storageClassesURL,
  storageClasses,
  loadConfigMaps,
  secretURL,
  loadSecrets,
  loadStorageClasses,
  configMapURL,
}) => {
  const classes = useStyles();
  const push = usePush();
  useEffect(() => {
    if (current.size === 0) {
      readStatefulSet(id, {
        url: `${url}/${id}`,
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // cancel someThing
    };
  }, [clusterID, namespaceID, id, current.size, readStatefulSet, url]);
  useEffect(() => {
    if (storageClassesURL) {
      loadStorageClasses(storageClassesURL, { clusterID });
    }
  }, [clusterID, loadStorageClasses, storageClassesURL]);
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
    const updateUrl = current.getIn(['links', 'update']);
    try {
      const data = formValues.toJS();
      const { containers } = data;
      data.containers = containers.map((item) => {
        if (item && item.args) {
          item.args = parseCmd(item.args);
        }
        if (item && item.command) {
          item.command = parseCmd(item.command);
        }
        return item;
      });
      await new Promise((resolve, reject) => {
        updateStatefulSet(data, {
          resolve,
          reject,
          url: updateUrl,
          clusterID,
          namespaceID,
        });
      });
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/statefulSets`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet
        title={messages.updatePageTitle}
        description={messages.updatePageDesc}
      />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/statefulSets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.updatePageTitle} />,
            },
          ]}
        />

        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            {current.size === 0 ? null : (
              <StatefulSetForm
                onSubmit={doSubmit}
                formValues={values}
                initialValues={current.update((c) => {
                  const val = c.toJS();
                  const { containers } = val;
                  val.containers = containers.map((item) => {
                    if (item && item.args) {
                      item.args = parseCmd(item.args);
                    }
                    if (item && item.command) {
                      item.command = parseCmd(item.command);
                    }
                    return item;
                  });
                  return val;
                })}
                configMaps={configMaps}
                secrets={secrets}
                storageClasses={storageClasses}
                role="update"
              />
            )}
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.update} />
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
  current: makeSelectCurrent(),
  id: makeSelectCurrentID(),
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  secrets: makeSelectSecrets(),
  storageClasses: makeSelectStorageClasses(),
  storageClassesURL: makeSelectStorageClassesURL(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      loadStorageClasses: storagesAction.loadStorageClasses,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpdateStatefulSetPage);
