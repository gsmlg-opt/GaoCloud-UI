/**
 *
 * Rollback Dialog
 *
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable.js';
import getByKey from '../../../src/utils/getByKey';

import Typography from '@mui/material/Typography.js';
import Paper from '@mui/material/Paper.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import Dialog from '@mui/material/Dialog.js';
import Button from '@mui/material/Button.js';
import IconButton from '@mui/material/IconButton.js';
import CloseIcon from 'components/Icons/Close.js';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from '../../../app/ducks/namespaces/selectors';
import { makeSelectDaemonSets } from '../../../app/ducks/daemonSets/selectors';
import * as actions from '../../../app/ducks/daemonSets/actions';

import messages from './messages';
import useStyles from './styles';
import Form from './RollbackForm';

export const formName = 'upgradeDaemonSetForm';

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

const RollbackForm = reduxForm({
  form: formName,
  validate,
})(Form);

/* eslint-disable react/prefer-stateless-function */
export const RollbackDialog = ({
  open,
  close,
  id,
  clusterID,
  namespaceID,
  daemonSets,
  values,
  readDaemonSet,
  executeDaemonSetAction,
  submitForm,
}) => {
  const classes = useStyles();
  const { protocol, hostname, port } = window.location;
  const [initialValues, setInitialValues] = useState(null);
  const [history, setHistory] = useState([]);

  async function doSubmit(formValues) {
    try {
      const current = history.find(
        (h) => h.version === formValues.get('version')
      );
      const data = {
        version: formValues.get('version'),
        reason: current.changeReason,
      };
      const item = daemonSets.get(id);
      const url = item.getIn(['links', 'self']);
      await new Promise((resolve, reject) => {
        executeDaemonSetAction('rollback', data, {
          resolve,
          reject,
          url,
          id,
          clusterID,
          namespaceID,
        });
      });
      readDaemonSet(id, {
        url,
        clusterID,
        namespaceID,
      });
      close();
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      /* maxWidth="md" */
      open={open}
      onEnter={() => {
        const item = daemonSets.get(id);

        const resolve = (resp) => {
          const data = getByKey(resp, ['response', 'history'], []);
          setHistory(data);
          const init = {
            version: data.length > 0 ? data[data.length - 1].version : 0,
          };
          setInitialValues(fromJS(init));
        };
        const reject = (error) => {
          // console.log(error);
        };
        executeDaemonSetAction(
          'history',
          {},
          {
            resolve,
            reject,
            url: item.getIn(['links', 'self']),
            id,
            clusterID,
            namespaceID,
          }
        );
      }}
      onExit={() => {
        setInitialValues(null);
      }}
      PaperProps={{ style: { overflow: 'hidden' } }}
    >
      <Card className={classes.dialogCard}>
        <CardHeader color="light" className={classes.dialogHeader}>
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage {...messages.dialogRollback} />
          </h4>
          <IconButton onClick={close} style={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </CardHeader>
        <CardBody className={classes.dialogCardBody}>
          <Paper elevation={0} className={classes.dialogCardBodyPaper}>
            {initialValues && (
              <RollbackForm
                onSubmit={doSubmit}
                initialValues={initialValues}
                formValues={values || initialValues}
                history={history}
              />
            )}
          </Paper>
        </CardBody>
        <CardFooter className={classes.dialogCardFooter}>
          <Button onClick={submitForm} color="primary" variant="contained">
            <FormattedMessage {...messages.dialogRollbackButton} />
          </Button>
          <Button onClick={close}  className={classes.cancleBtn} variant="contained">
            <FormattedMessage {...messages.dialogCancelButton} />
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  daemonSets: makeSelectDaemonSets(),
  values: getFormValues(formName),
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

export default compose(withConnect)(RollbackDialog);
