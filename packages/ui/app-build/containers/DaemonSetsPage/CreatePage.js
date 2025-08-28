/* eslint-disable no-param-reassign */
/**
 *
 * Create DaemonSet Page
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
import ConfirmDialog from 'components/Confirm/ConfirmDialog.js';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from '../../../app/ducks/namespaces/selectors';

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
import {
  makeSelectStorageClasses,
  makeSelectURL as makeSelectStorageClassesURL,
} from '../../../app/ducks/storageClasses/selectors';
import * as storagesAction from '../../../app/ducks/storageClasses/actions';
import { makeSelectURL } from '../../../app/ducks/daemonSets/selectors';
import * as actions from '../../../app/ducks/daemonSets/actions';

import messages from './messages';
import useStyles from './styles';
import DaemonSetForm, { formName } from './CreateForm';

/* eslint-disable react/prefer-stateless-function */
export const CreateDaemonSet = ({
  clusterID,
  namespaceID,
  cluster,
  configMapURL,
  loadConfigMaps,
  secretURL,
  loadSecrets,
  loadStorageClasses,
  createDaemonSet,
  submitForm,
  url,
  configMaps,
  secrets,
  storageClassesURL,
  storageClasses,
  values,
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
      });
      const { response } = await new Promise((resolve, reject) => {
        createDaemonSet(data, {
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
          push(`/clusters/${clusterID}/namespaces/${namespaceID}/daemonSets`);
        }}
        onAction={() => {
          push(
            `/clusters/${clusterID}/namespaces/${namespaceID}/services/create?from=true&targetResourceType=daemonSets&targetName=${open}`
          );
        }}
        title={<FormattedMessage {...messages.successTitle} />}
        content={<FormattedMessage {...messages.successContent} />}
      />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/daemonSets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createDaemonSet} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <DaemonSetForm
              classes={classes}
              onSubmit={doSubmit}
              configMaps={configMaps}
              secrets={secrets}
              storageClasses={storageClasses}
              initialValues={fromJS({
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
                    `/clusters/${clusterID}/namespaces/${namespaceID}/daemonSets`
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

export default compose(withConnect)(CreateDaemonSet);
