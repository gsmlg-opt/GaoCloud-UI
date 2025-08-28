/**
 *
 * Create Cluster Page
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable.js';
import { SubmissionError, submit } from 'redux-form';
import { Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import Fab from '@mui/material/Fab.js';
import Button from '@mui/material/Button.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Helmet from 'components/Helmet/Helmet.js';

import { usePush } from 'hooks/router.js';

import { makeSelectURL } from '../../../app/ducks/clusters/selectors';
import * as actions from '../../../app/ducks/clusters/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import messages from './messages';
import useStyles from './styles';
import ClusterForm from './CreateForm';

export const formName = 'createClusterForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
    'clusterDomain',
    'singleCloudAddress',
    'sshUser',
  ];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateClusterForm = reduxForm({
  form: formName,
  validate,
})(ClusterForm);

export const CreateClusterPage = ({
  submitForm,
  createCluster,
  url,
  values,
}) => {
  const classes = useStyles();
  const push = usePush();
  async function doSubmit(formValues) {
    try {
      const {
        advancedOptions,
        enableAdvancedOptions,
        nodes,
        ...formData
      } = formValues.toJS();
      const { main, work } = nodes;
      main.forEach((item) => {
        item.roles.push('controlplane');
      });
      work.forEach((item) => {
        item.roles.push('worker');
      });
      const nodeArr = main.concat(work).filter((v) => v.name && v.address);
      const data = {
        nodes: nodeArr,
        ...formData,
        ...(enableAdvancedOptions ? advancedOptions : {}),
      };
      await new Promise((resolve, reject) => {
        createCluster(data, {
          resolve,
          reject,
          url,
        });
      });
      push('/clusters');
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
              path: '/clusters',
              name: <FormattedMessage {...messages.clusters} />,
            },
            {
              name: <FormattedMessage {...messages.createCluster} />,
            },
          ]}
        />
        <Typography component="div">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CreateClusterForm
                classes={classes}
                onSubmit={doSubmit}
                initialValues={fromJS({
                  name: '',
                  nodes: { main: [{ name: '', address: '', roles: []}], work: [{ name: '', address: '', roles: []}] },
                })}
                formValues={values}
              />
              <div className={classes.buttonGroup}>
                <Button variant="contained" color="primary" onClick={submitForm}>
                  <FormattedMessage {...messages.createClusterButton} />
                </Button>
                <Button
                  variant="contained"
                  className={classes.cancleBtn}
                  component={Link}
                  to="/clusters"
                >
                  <FormattedMessage {...messages.cancleClustersButton} />
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
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

export default compose(withConnect)(CreateClusterPage);
