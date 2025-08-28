/**
 *
 * Create workFlow Page
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
import { usePush } from 'hooks/router';

import Helmet from '../../components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import parseCmd from '../../../src/utils/parseCmd.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';

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
import { makeSelectURL } from '../../ducks/workFlows/selectors.js';
import * as actions from '../../ducks/workFlows/actions.js';

import messages from './messages';
import useStyles from './styles';
import CreateWorkFlowForm, {
  formName,
} from './CreateForm';

export const CreateWorkFlowPage = ({
  createWorkFlow,
  submitForm,
  url,
  clusterID,
  namespaceID,
  values,
  configMapURL,
  loadConfigMaps,
  secretURL,
  loadSecrets,
  loadStorageClasses,
  configMaps,
  secrets,
  storageClassesURL,
  storageClasses,
  pvc,
  pvcURL,
  loadPersistentVolumeClaims,
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
    if (pvcURL) {
      loadPersistentVolumeClaims(pvcURL, {
        clusterID,
        namespaceID,
      });
    }
  }, [clusterID, configMapURL, loadConfigMaps, loadPersistentVolumeClaims, loadSecrets, namespaceID, pvcURL, secretURL]);

  async function doSubmit(formValues) {
    try {
      const { name, autoDeploy, deploy, image, ...formData } = formValues.toJS();
      const {containers, persistentVolumes} = deploy;
      deploy.name = name;
      if(containers){
        deploy.containers = containers.map((item) => {
          if (item && item.args) {
            item.args = parseCmd(item.args);
          }
          if (item && item.command) {
            item.command = parseCmd(item.command);
          }
          item.image = image.name;
          return item;
        });
      };
      if(persistentVolumes){
        persistentVolumes.forEach((item) => {
          if (item && item.size) {
            item.size = `${item.size}Gi`;
          }
        });
      };
      const data = {
        name,
        image,
        autoDeploy,
        deploy,
        ...formData,
      };
      if(!autoDeploy){
        delete data.deploy
      }
      await new Promise((resolve, reject) => {
        createWorkFlow(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.createPageTitle} description={messages.createPageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateWorkFlowForm
              onSubmit={doSubmit}
              formValues={values}
              configMaps={configMaps}
              secrets={secrets}
              storageClasses={storageClasses}
              pvc={pvc}
              initialValues={fromJS({
                autoDeploy:false,
                deploy:{
                  replicas:1,
                  containers: [{}],
                  advancedOptions: { injectServiceMesh: true },
                },
              })}
            />
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.save} />
              </Button>
              <Button
                variant="contained"
                className={classes.cancleBtn}
                onClick={() => {
                  push(
                    `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`
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
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  pvcURL: makeSelectPvcURL(),
  secrets: makeSelectSecrets(),
  storageClasses: makeSelectStorageClasses(),
  storageClassesURL: makeSelectStorageClassesURL(),
  pvc: makeSelectPersistentVolumeClaims(),
  values: getFormValues(formName),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
      loadSecrets: sActions.loadSecrets,
      loadStorageClasses: storagesAction.loadStorageClasses,
      loadPersistentVolumeClaims: pActions.loadPersistentVolumeClaims,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(CreateWorkFlowPage);
