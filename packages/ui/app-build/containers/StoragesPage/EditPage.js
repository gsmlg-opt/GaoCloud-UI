/**
 *
 * Edit Storage Page
 *
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable.js';
import { SubmissionError, submit } from 'redux-form';

import Helmet from 'components/Helmet/Helmet.js';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import Fab from '@mui/material/Fab.js';
import IconButton from '@mui/material/IconButton.js';
import AddIcon from 'components/Icons/Add.js';
import Button from '@mui/material/Button.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import * as actions from '../../../app/ducks/storages/actions';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from '../../../app/ducks/storages/selectors';
import * as bdActions from '../../../app/ducks/blockDevices/actions';
import {
  makeSelectURL as makeSelectBlockDevicesURL,
  makeSelectBlockDevicesList,
} from '../../../app/ducks/blockDevices/selectors';
import * as nodesActions from '../../../app/ducks/nodes/actions';
import {
  makeSelectURL as makeSelectNodesURL,
  makeSelectNodesList,
} from '../../../app/ducks/nodes/selectors';

import { usePush, useLocation } from 'hooks/router.js';

import messages from './messages';
import useStyles from './styles';
import StorageForm from './Form';

export const formName = 'editStorageForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const EditStorageForm = reduxForm({
  form: formName,
  validate,
})(StorageForm);

export const EditStoragePage = ({
  loadBlockDevices,
  devicesURL,
  blockDevices,
  loadNodes,
  nodesURL,
  nodes,
  clusterID,
  id,
  readStorage,
  updateStorage,
  submitForm,
  storage,
  url,
  values,
}) => {
  const classes = useStyles();
  const push = usePush();
  const location = useLocation();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    readStorage(id, { clusterID, url: `${url}/${id}`, resolve: () => setTimeout(() => setReady(true), 20) });
    if (devicesURL) {
      loadBlockDevices(devicesURL, { clusterID });
    }
    if (nodesURL) {
      loadNodes(nodesURL, { clusterID });
    }
  }, [nodesURL, devicesURL, url, id, clusterID, readStorage, loadBlockDevices, loadNodes]);

  const itemUrl = storage.getIn(['links', 'update']);
  async function doSubmit(formValues) {
    try {
      const data = formValues.set(formValues.get('type'), formValues.get('parameter')).remove('parameter').toJS();
      await new Promise((resolve, reject) => {
        updateStorage(
          { ...data },
          { resolve, reject, clusterID, url: itemUrl }
        );
      });
      push(`/clusters/${clusterID}/storages`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  const initialValues = storage.set('parameter', storage.get(storage.get('type')));

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
            {
              name: <FormattedMessage {...messages.editStorage} />,
            },
          ]}
        />
        <Typography component="div">
          {ready > 0 ? (
            <EditStorageForm
              classes={classes}
              onSubmit={doSubmit}
              initialValues={storage.set('parameter', storage.get(storage.get('type')))}
              blockDevices={blockDevices.filter(
                (b) =>
                  !b.get('usedby') ||
                  b.get('usedby') === storage.get('name')
              )}
              nodes={nodes}
              formValues={values || storage.set('parameter', storage.get(storage.get('type')))}
              edit
            />
          ) : null}
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.editStorageButton} />
              </Button>
            </div>
          </GridItem>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  id: makeSelectCurrentID(),
  url: makeSelectURL(),
  devicesURL: makeSelectBlockDevicesURL(),
  blockDevices: makeSelectBlockDevicesList(),
  nodesURL: makeSelectNodesURL(),
  nodes: makeSelectNodesList(),
  values: getFormValues(formName),
  storage: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...bdActions,
      ...nodesActions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditStoragePage);
