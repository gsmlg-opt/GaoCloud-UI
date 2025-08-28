/**
 *
 * AdminUserQuotaPage
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';
import { SubmissionError, submit } from 'redux-form';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import getByKey from '../../../src/utils/getByKey.js';

import { withStyles } from '@mui/styles';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ErrorInfo from '../../components/ErrorInfo/ErrorInfo.js';
import Helmet from '../../components/Helmet/Helmet.js';

import {
  makeSelectURL,
  makeSelectUserQuotasList,
} from '../../ducks/userQuotas/selectors.js';
import * as actions from '../../ducks/userQuotas/actions.js';

import messages from './messages';
import useStyles from './styles';
import AdminUserQuotasTable from './AdminUserQuotasTable';
import UserQuotaForm from './form/searchForm';

export const formName = 'searchUserQuotaForm';

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

const SearchUserQuotaForm = reduxForm({
  form: formName,
  validate,
})(UserQuotaForm);

const AdminUserQuotaPage = ({ submitForm, loadUserQuotas, url }) => {
  const classes = useStyles();
  const [filter, setFilter] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      loadUserQuotas(url);
    }
    const t = setInterval(() => loadUserQuotas(url), 3000);
    return () => clearInterval(t);
  }, [loadUserQuotas, url]);

  const doSubmit = (formValues) => {
    setFilter(formValues.toJS());
  };

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: '/adminUserQuotas',
              name: <FormattedMessage {...messages.adminRequestListPage} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          {error ? (
            <ErrorInfo
              errorText={getByKey(error, ['response', 'message'])}
              close={() => setError(null)}
            />
          ) : null}
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.requestList} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer style={{ marginBottom: '20px' }}>
                  <GridItem xs={6} sm={6} md={6}>
                    <SearchUserQuotaForm
                      classes={classes}
                      onSubmit={doSubmit}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitForm}
                      style={{ marginTop: '10px' }}
                    >
                      <FormattedMessage {...messages.searchUserQuotaButton} />
                    </Button>
                  </GridItem>
                </GridContainer>
                <AdminUserQuotasTable filter={filter} setError={setError} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
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

export default compose(withConnect)(AdminUserQuotaPage);
