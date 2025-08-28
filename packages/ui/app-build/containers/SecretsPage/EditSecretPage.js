/**
 *
 * CreateSecretPage
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable.js';
import { SubmissionError, submit } from 'redux-form';
import { push } from 'connected-react-router';
import { withStyles } from '@mui/styles.js';

import CssBaseline from '@mui/material/CssBaseline.js';
import Button from '@mui/material/Button.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import Helmet from 'components/Helmet/Helmet.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import * as actions from '../../../app/ducks/secrets/actions';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from '../../../app/ducks/secrets/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import messages from './messages';
import useStyles from './styles';
import SecretForm from './SecretForm';

export const formName = 'createSecretForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  const configs = values.get('configs');
  if (!configs || configs.size === 0) {
    errors.configs = [];
    errors.configs._error = 'At least one config file must be add'; // eslint-disable-line
  } else {
    errors.configs = [];
    configs.forEach((c) => {
      if (c) {
        const { name, data } = c;
        const err = {};
        if (!name) err.name = 'Required';
        if (!data) err.data = 'Required';
        errors.configs.push(err);
      } else {
        errors.configs.push({ name: 'Required', data: 'Required' });
      }
    });
  }
  return errors;
};

const CreateSecretForm = reduxForm({
  form: formName,
  validate,
})(SecretForm);

export const EditSecret = ({
  readSecret,
  updateSecret,
  submitForm,
  clusterID,
  namespaceID,
  id,
  url,
  secret,
  routeTo,
}) => {
  const classes = useStyles();
  useEffect(() => {
    readSecret(id, { url: `${url}/${id}`, clusterID, namespaceID });
  }, [clusterID, id, namespaceID, readSecret, url]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const updateUrl = secret.getIn(['links', 'update']);
      await new Promise((resolve, reject) => {
        updateSecret(data, {
          resolve,
          reject,
          url: updateUrl,
          clusterID,
          namespaceID,
        });
      });
      routeTo(`/clusters/${clusterID}/namespaces/${namespaceID}/secrets`);
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
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/secrets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.editSecret} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.editSecret} />
                </h4>
              </CardHeader>
              <CardBody>
                {secret && secret.size > 0 ? (
                  <CreateSecretForm
                    classes={classes}
                    onSubmit={doSubmit}
                    initialValues={secret}
                    secret={secret}
                    type="edit"
                  />
                ) : null}
              </CardBody>
            </Card>
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.formCreate} />
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
  id: makeSelectCurrentID(),
  secret: makeSelectCurrent(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      routeTo: push,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditSecret);
