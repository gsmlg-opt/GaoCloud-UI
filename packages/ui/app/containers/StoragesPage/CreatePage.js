/**
 *
 * Create Storage Page
 *
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import Helmet from '../../components/Helmet/Helmet.js';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '../../components/Icons/Add.js';
import Button from '@mui/material/Button';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import * as actions from '../../ducks/storages/actions.js';
import { makeSelectURL } from '../../ducks/storages/selectors.js';
import * as bdActions from '../../ducks/blockDevices/actions.js';
import {
  makeSelectURL as makeSelectBlockDevicesURL,
  makeSelectBlockDevicesList,
} from '../../ducks/blockDevices/selectors.js';
import * as nodesActions from '../../ducks/nodes/actions.js';
import {
  makeSelectURL as makeSelectNodesURL,
  makeSelectNodesList,
} from '../../ducks/nodes/selectors.js';

import { usePush, useLocation } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import StorageForm from './Form';

export const formName = 'createStorageForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name', 'type'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateStorageForm = reduxForm({
  form: formName,
  validate,
})(StorageForm);

const initFormValue = fromJS({ name: '', type: '', parameter: { hosts: [], initiators: [],targets:[''] } });

export const CreateStoragePage = ({
  loadBlockDevices,
  devicesURL,
  blockDevices,
  loadNodes,
  nodesURL,
  nodes,
  cluster,
  clusterID,
  createStorage,
  submitForm,
  url,
  values,
}) => {
  const classes = useStyles();
  const push = usePush();
  const location = useLocation();
  useEffect(() => {
    if (devicesURL) {
      loadBlockDevices(devicesURL, { clusterID });
    }
    if (nodesURL) {
      loadNodes(nodesURL, { clusterID });
    }
  }, [clusterID, devicesURL, loadBlockDevices, loadNodes, nodesURL]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.set(formValues.get('type'), formValues.get('parameter')).remove('parameter').toJS();
      await new Promise((resolve, reject) => {
        createStorage({ ...data }, { resolve, reject, clusterID, url });
      });
      push(`/clusters/${clusterID}/storages`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

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
              name: <FormattedMessage {...messages.createStorage} />,
            },
          ]}
        />
        <Typography component="div">
          <CreateStorageForm
            classes={classes}
            onSubmit={doSubmit}
            initialValues={initFormValue}
            blockDevices={blockDevices.filter((b) => !b.get('usedby'))}
            nodes={nodes}
            formValues={values || initFormValue}
          />
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.createStorageButton} />
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
  url: makeSelectURL(),
  devicesURL: makeSelectBlockDevicesURL(),
  blockDevices: makeSelectBlockDevicesList(),
  nodesURL: makeSelectNodesURL(),
  nodes: makeSelectNodesList(),
  values: getFormValues(formName),
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

export default compose(withConnect)(CreateStoragePage);
