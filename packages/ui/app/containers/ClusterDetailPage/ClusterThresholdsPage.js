/**
 *
 * Cluster Thresholds Page
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

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
import Helmet from '../../components/Helmet/Helmet.js';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectURL } from '../../ducks/clusterThresholds/selectors.js';
import * as actions from '../../ducks/clusterThresholds/actions.js';

import { usePush } from 'hooks/router';

import messages from './messages';
import useStyles from './styles';
import Form from './ClusterThresholdsForm';

export const formName = 'clusterThresholdsForm';

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

const ClusterThresholdsForm = reduxForm({
  form: formName,
  validate,
})(Form);

export const ClusterThresholdsPage = ({
  url,
  clusterID,
  submitForm,
  createNamespace,
}) => {
  const classes = useStyles();
  const push = usePush();

  async function doSubmit(formValues) {
    try {
      const { name, cpu, memory, storage } = formValues.toJS();
      const data = {
        name,
        limits: {
          'requests.storage': `${storage}Gi`,
        },
      };

      const { response } = await new Promise((resolve, reject) => {
        createNamespace({ name }, { resolve, reject, clusterID, url });
      });
      const {
        id: nsID,
        links: { resourcequotas: rqURL },
      } = response;
      push(`/clusters/${clusterID}/namespaces`);
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
              path: `/clusters/${clusterID}/namespaces`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createNamespace} />,
            },
          ]}
        />
        <Typography component="div" className="">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.createNamespace} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <ClusterThresholdsForm
                    classes={classes}
                    onSubmit={doSubmit}
                    initialValues={fromJS({ name: '' })}
                    type="create"
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                  >
                    <FormattedMessage {...messages.createNamespaceButton} />
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
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

export default compose(withConnect)(ClusterThresholdsPage);
