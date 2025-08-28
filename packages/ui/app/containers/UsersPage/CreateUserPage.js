/**
 *
 * Create User
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';
import sha1 from 'crypto-js/sha1';
import encHex from 'crypto-js/enc-hex';

import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import Helmet from '../../components/Helmet/Helmet.js';

import * as actions from '../../ducks/users/actions.js';
import { makeSelectData as makeSelectNamespacesData } from '../../ducks/namespaces/selectors.js';
import { makeSelectClusters } from '../../ducks/clusters/selectors.js';
import { makeSelectURL } from '../../ducks/users/selectors.js';

import { usePush } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import UserForm from './UserForm';

export const formName = 'createUserForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name', 'password'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateUserForm = reduxForm({
  form: formName,
  validate,
})(UserForm);

export const CreateUserPage = ({
  url,
  clusters,
  namespacesData,
  createUser,
  submitForm,
}) => {
  const classes = useStyles();
  const push = usePush();
  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const password = sha1(formValues.get('password')).toString(encHex);

      await new Promise((resolve, reject) => {
        createUser({ ...data, password }, { url, resolve, reject });
      });
      push('/users');
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
              path: '/users',
              name: <FormattedMessage {...messages.usersList} />,
            },
            {
              name: <FormattedMessage {...messages.createUser} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.createUser} />
                </h4>
              </CardHeader>
              <CardBody>
                <CreateUserForm
                  classes={classes}
                  clusters={clusters}
                  namespacesData={namespacesData}
                  onSubmit={doSubmit}
                  initialValues={fromJS({
                    name: '',
                    password: '',
                    projects: [],
                  })}
                />
              </CardBody>
            </Card>
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.createUserButton} />
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  clusters: makeSelectClusters(),
  namespacesData: makeSelectNamespacesData(),
  values: createSelector(getFormValues(formName), (v) => v),
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

export default compose(withConnect)(CreateUserPage);
