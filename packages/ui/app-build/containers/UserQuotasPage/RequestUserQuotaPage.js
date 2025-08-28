/**
 *
 * RequestUserQuotaPage
 *
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { SubmissionError, submit } from 'redux-form';
import { Link } from 'react-router-dom';
import { reduxForm, getFormValues } from 'redux-form/immutable.js';

import { usePush } from 'hooks/router.js';

import { withStyles } from '@mui/styles.js';
import CssBaseline from '@mui/material/CssBaseline.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import Helmet from 'components/Helmet/Helmet.js';
import { makeSelectClusters } from '../../../app/ducks/clusters/selectors';

import Button from '@mui/material/Button.js';

import {
  makeSelectCurrent,
  makeSelectURL,
  makeSelectCurrentID,
} from '../../../app/ducks/userQuotas/selectors';
import * as actions from '../../../app/ducks/userQuotas/actions';

import messages from './messages';
import useStyles from './styles';
import RequestUserQuotaForm from './RequestUserQuotaForm';

export const formName = 'CreateRequestUserQuotaForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['namespace', 'cpu', 'memory', 'storage', 'purpose'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateRequestUserQuotaForm = reduxForm({
  form: formName,
  validate,
})(RequestUserQuotaForm);

const RequestUserQuotaPage = ({
  userQuota,
  submitForm,
  executeUserQuotaAction,
  clusters,
  readUserQuota,
  userQuotaID,
  url,
}) => {
  const classes = useStyles();
  const push = usePush();
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    if (url) {
      readUserQuota(userQuotaID, {
        url: `${url}/${userQuotaID}`,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [readUserQuota, url, userQuotaID]);

  async function doSubmit(formValues) {
    try {
      const { clusterName, reason } = formValues.toJS();
      const aurl = `${userQuota.getIn(['links', 'self'])}`;
      const data = actionType === 'approval' ? { clusterName } : { reason };
      await new Promise((resolve, reject) => {
        executeUserQuotaAction(
          actionType,
          { ...data },
          { resolve, reject, url: aurl }
        );
      });
      push(`/adminUserQuotas`);
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
              path: `/adminUserQuotas`,
              name: <FormattedMessage {...messages.adminRequestListPage} />,
            },
            {
              name: <FormattedMessage {...messages.requestDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.detail} />
                </h4>
              </CardHeader>
              <CardBody>
                <CreateRequestUserQuotaForm
                  classes={classes}
                  onSubmit={doSubmit}
                  initialValues={userQuota}
                  userQuota={userQuota}
                  clusters={clusters}
                />
              </CardBody>
            </Card>
            <div className={classes.buttonGroup}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setActionType('approval');
                      setTimeout(submitForm, 100);
                    }}
                  >
                    <FormattedMessage {...messages.passBtn} />
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.cancleBtn}
                    onClick={() => {
                      setActionType('reject');
                      setTimeout(submitForm, 100);
                    }}
                  >
                    <FormattedMessage {...messages.rejectBtn} />
                  </Button>
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userQuota: makeSelectCurrent(),
  url: makeSelectURL(),
  clusters: makeSelectClusters(),
  userQuotaID: makeSelectCurrentID(),
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

export default compose(withConnect)(RequestUserQuotaPage);
