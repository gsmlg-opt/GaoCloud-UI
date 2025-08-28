/**
 *
 * Create Deployment Page
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

import Helmet from '../../components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import ConfirmDialog from '../../components/Confirm/ConfirmDialog.js';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from '../../ducks/namespaces/selectors.js';

import * as sActions from '../../ducks/secrets/actions.js';
import {
  makeSelectSecrets,
  makeSelectURL as makeSelectSecretURL,
} from '../../ducks/secrets/selectors.js';
import * as cActions from '../../ducks/configMaps/actions.js';
import * as pActions from '../../ducks/persistentVolumeClaims/actions.js';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from '../../ducks/configMaps/selectors.js';
import {
  makeSelectStorageClasses,
  makeSelectURL as makeSelectStorageClassesURL,
} from '../../ducks/storageClasses/selectors.js';
import {
  makeSelectPersistentVolumeClaims,
  makeSelectURL as makeSelectPvcURL,
} from '../../ducks/persistentVolumeClaims/selectors.js';
import * as storagesAction from '../../ducks/storageClasses/actions.js';
import { makeSelectURL } from '../../ducks/deployments/selectors.js';
import * as actions from '../../ducks/deployments/actions.js';

import messages from './messages';
import useStyles from './styles';
import DeploymentForm, { formName } from './CreateForm';

/* eslint-disable react/prefer-stateless-function */
export const CreateDeployment = ({
  clusterID,
  namespaceID,
  cluster,
  configMapURL,
  loadConfigMaps,
  secretURL,
  loadSecrets,
  loadStorageClasses,
  createDeployment,
  submitForm,
  url,
  configMaps,
  secrets,
  storageClassesURL,
  storageClasses,
  values,
  // pvc,
  // pvcURL,
  // loadPersistentVolumeClaims,
}) => {
  const classes = useStyles();
  const push = usePush();

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
    // if (pvcURL) {
    //   loadPersistentVolumeClaims(pvcURL, {
    //     clusterID,
    //     namespaceID,
    //   });
    // }
  }, [
    clusterID,
    configMapURL,
    loadConfigMaps,
    loadSecrets,
    namespaceID,
    secretURL,
  ]);
  const [open, setOpen] = useState(false);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const { containers, persistentVolumes } = data;
      data.containers = containers.map((item) => {
        if (item && item.args) {
          item.args = parseCmd(item.args);
        }
        if (item && item.command) {
          item.command = parseCmd(item.command);
        }
        return item;
      });
      persistentVolumes.forEach((item) => {
        if (item && item.size) {
          item.size = `${item.size}Gi`;
        }
        // if (item && item.name) {
        //   if (pvc.get(item.name)) {
        //     item.size = pvc.getIn([item.name, 'actualStorageSize']);
        //   } else {
        //     item.size = `${item.size}Gi`;
        //   }
        // }
      });
      const { response } = await new Promise((resolve, reject) => {
        createDeployment(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      setOpen(response.name);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <ConfirmDialog
        open={!!open}
        onClose={() => {
          push(`/clusters/${clusterID}/namespaces/${namespaceID}/deployments`);
        }}
        onAction={() => {
          push(
            `/clusters/${clusterID}/namespaces/${namespaceID}/services/create?from=true&targetResourceType=deployments&targetName=${open}`
          );
        }}
        title={<FormattedMessage {...messages.successTitle} />}
        content={<FormattedMessage {...messages.successContent} />}
      />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/deployments`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createDeployment} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <DeploymentForm
              classes={classes}
              onSubmit={doSubmit}
              configMaps={configMaps}
              secrets={secrets}
              storageClasses={storageClasses}
              // pvc={pvc}
              initialValues={fromJS({
                replicas: 1,
                containers: [{ name: '', exposedPorts: [] }],
                persistentVolumes: [],
                advancedOptions: { injectServiceMesh: true },
              })}
              formValues={values}
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
                    `/clusters/${clusterID}/namespaces/${namespaceID}/deployments`
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
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  url: makeSelectURL(),
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  // pvcURL: makeSelectPvcURL(),
  secrets: makeSelectSecrets(),
  storageClasses: makeSelectStorageClasses(),
  storageClassesURL: makeSelectStorageClassesURL(),
  // pvc: makeSelectPersistentVolumeClaims(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      loadStorageClasses: storagesAction.loadStorageClasses,
      // loadPersistentVolumeClaims: pActions.loadPersistentVolumeClaims,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateDeployment);
