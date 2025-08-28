/**
 *
 * Edit User
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

import CssBaseline from '@mui/material/CssBaseline.js';
import Button from '@mui/material/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Helmet from 'components/Helmet/Helmet.js';

import * as actions from '../../../app/ducks/users/actions';
import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from '../../../app/ducks/users/selectors';
import { makeSelectData as makeSelectNamespacesData } from '../../../app/ducks/namespaces/selectors';
import { makeSelectClusters } from '../../../app/ducks/clusters/selectors';

import { usePush } from 'hooks/router.js';

import messages from './messages';
import useStyles from './styles';
import UserForm from './UserForm';

export const formName = 'editUserForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const EditUserForm = reduxForm({
  form: formName,
  validate,
})(UserForm);

export const EditUserPage = ({
  clusters,
  namespacesData,
  updateUser,
  submitForm,
  user,
  id,
  url,
  readUser,
}) => {
  const classes = useStyles();
  const push = usePush();
  useEffect(() => {
    readUser(id, { url: `${url}/${id}` });
  }, [id, readUser, url]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      await new Promise((resolve, reject) => {
        updateUser(data, {
          url: user.getIn(['links', 'update']),
          resolve,
          reject,
        });
      });
      push(`/users/${id}/profile`);
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
              name: <FormattedMessage {...messages.editUser} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.editUser} />
                </h4>
              </CardHeader>
              <CardBody>
                {user.size === 0 ? null : (
                  <EditUserForm
                    edit
                    classes={classes}
                    clusters={clusters}
                    namespacesData={namespacesData}
                    onSubmit={doSubmit}
                    initialValues={user}
                  />
                )}
              </CardBody>
            </Card>
            <div className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.updateUser} />
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  namespacesData: makeSelectNamespacesData(),
  id: makeSelectCurrentID(),
  user: makeSelectCurrent(),
  url: makeSelectURL(),
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

export default compose(withConnect)(EditUserPage);
