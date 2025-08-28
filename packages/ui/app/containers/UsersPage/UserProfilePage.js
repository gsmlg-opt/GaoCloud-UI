/**
 *
 * User Profile
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import KeyIcon from '@mui/icons-material/VpnKey';
import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Helmet from '../../components/Helmet/Helmet.js';

import * as actions from '../../ducks/users/actions.js';
import {
  makeSelectCurrent,
  makeSelectCurrentID,
  makeSelectURL,
} from '../../ducks/users/selectors.js';
import { makeSelectData as makeSelectNamespacesData } from '../../ducks/namespaces/selectors.js';
import { makeSelectClusters } from '../../ducks/clusters/selectors.js';

import messages from './messages';
import useStyles from './styles';
import UserForm from './UserForm';

export const formName = 'userProfileForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const UserProfileForm = reduxForm({
  form: formName,
  validate,
})(UserForm);

export const UserProfilePage = ({
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
  useEffect(() => {
    readUser(id, { url: `${url}/${id}` });
  }, [id, readUser, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              name: <FormattedMessage {...messages.userProfile} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.userProfile} />
                  <Link
                    to={`/users/${user && user.get('id')}/passwd`}
                    className={classes.createBtnLink}
                  >
                    <Fab size="small" color="default" aria-label="create user">
                      <KeyIcon />
                    </Fab>
                  </Link>
                </h4>
              </CardHeader>
              <CardBody>
                {user.size === 0 ? null : (
                  <UserProfileForm
                    profile
                    classes={classes}
                    clusters={clusters}
                    namespacesData={namespacesData}
                    initialValues={user}
                  />
                )}
              </CardBody>
            </Card>
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserProfilePage);
