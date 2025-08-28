/**
 *
 * Update workFlow Page
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

import { usePush } from 'hooks/router.js';

import Helmet from 'components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline.js';
import Button from '@mui/material/Button.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import parseCmd from '../../../src/utils/parseCmd';
import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from '../../../app/ducks/workFlows/selectors';
import * as actions from '../../../app/ducks/workFlows/actions';
import * as sActions from '../../../app/ducks/secrets/actions';
import {
  makeSelectSecrets,
  makeSelectURL as makeSelectSecretURL,
} from '../../../app/ducks/secrets/selectors';
import * as cActions from '../../../app/ducks/configMaps/actions';
import * as pActions from '../../../app/ducks/persistentVolumeClaims/actions';
import {
  makeSelectConfigMaps,
  makeSelectURL as makeSelectConfigMapURL,
} from '../../../app/ducks/configMaps/selectors';
import {
  makeSelectStorageClasses,
  makeSelectURL as makeSelectStorageClassesURL,
} from '../../../app/ducks/storageClasses/selectors';
import {
  makeSelectPersistentVolumeClaims,
  makeSelectURL as makeSelectPvcURL,
} from '../../../app/ducks/persistentVolumeClaims/selectors';
import * as storagesAction from '../../../app/ducks/storageClasses/actions';

import messages from './messages';
import useStyles from './styles';
import CreateWorkFlowForm, {
  formName,
} from './CreateForm';

export const UpdateWorkFlowPage = ({
  updateWorkFlow,
  readWorkFlow,
  submitForm,
  url,
  clusterID,
  namespaceID,
  id,
  current,
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

  useEffect(() => {
    if (current.size === 0) {
      readWorkFlow(id, {
        url: `${url}/${id}`,
        clusterID,
        namespaceID,
      });
    }
    return () => {
      // cancel someThing
    };
  }, [clusterID, current.size, id, namespaceID, readWorkFlow, url]);

  async function doSubmit(formValues) {
    const updateUrl = current.getIn(['links', 'update']);
    try {
      const { name, autoDeploy, deploy, image, ...formData } = formValues.toJS();
      const {containers, persistentVolumes} = deploy;
      deploy.name = name;
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
      const data = {
        name,
        image,
        autoDeploy,
        ...formData,
      };
      if(!autoDeploy){
        delete data.deploy
      }

      await new Promise((resolve, reject) => {
        updateWorkFlow(data, {
          resolve,
          reject,
          url: updateUrl,
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
      <Helmet title={messages.updatePageTitle} description={messages.updatePageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/workFlows`,
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
              <CreateWorkFlowForm
                onSubmit={doSubmit}
                formValues={values}
                configMaps={configMaps}
                secrets={secrets}
                storageClasses={storageClasses}
                pvc={pvc}
                initialValues={current.update((c) => {
                  const val = c.toJS();
                  const { deploy:{containers} } = val;
                  val.deploy.containers = containers && containers.map((item) => {
                    if (item && item.args) {
                      item.args = parseCmd(item.args);
                    }
                    if (item && item.command) {
                      item.command = parseCmd(item.command);
                    }
                    return item;
                  }) || [{}];
                  return val;
                })}
                role="update"
              />
            )}
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.update} />
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
  current: makeSelectCurrent(),
  id: makeSelectCurrentID(),
  values: getFormValues(formName),
  configMapURL: makeSelectConfigMapURL(),
  configMaps: makeSelectConfigMaps(),
  secretURL: makeSelectSecretURL(),
  pvcURL: makeSelectPvcURL(),
  secrets: makeSelectSecrets(),
  storageClasses: makeSelectStorageClasses(),
  storageClassesURL: makeSelectStorageClassesURL(),
  pvc: makeSelectPersistentVolumeClaims(),
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
)(UpdateWorkFlowPage);
