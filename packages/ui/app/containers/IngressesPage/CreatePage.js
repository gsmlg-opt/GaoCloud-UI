/**
 *
 * Create Ingress Page
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';

import { usePush } from 'hooks/router';

import Helmet from '../../components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectLocation } from '../../ducks/app/selectors.js';
import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import {
  makeSelectServices,
  makeSelectURL as makeSelectServicesURL,
} from '../../ducks/services/selectors.js';

import { makeSelectURL } from '../../ducks/ingresses/selectors.js';
import * as actions from '../../ducks/ingresses/actions.js';
import * as sActions from '../../ducks/services/actions.js';

import messages from './messages';
import useStyles from './styles';
import CreateIngressForm, { formName } from './CreateForm';

export const CreateIngressPage = ({
  createIngress,
  submitForm,
  url,
  clusterID,
  namespaceID,
  services,
  values,
  loadServices,
  surl,
  location,
}) => {
  const classes = useStyles();
  const push = usePush();
  const search = location.get('search');
  let targetName = '';
  if (search && search.includes('from=true')) {
    const [tn, name] = /targetName=([a-zA-Z0-9-]+)/i.exec(search);
    targetName = name;
  }

  useEffect(() => {
    if (url) {
      loadServices(surl, {
        clusterID,
        namespaceID,
      });
    }
  }, [clusterID, loadServices, namespaceID, surl, url]);

  async function doSubmit(formValues) {
    try {
      const { name, rules, maxBodySize } = formValues.toJS();
      const rulesArr = [];
      rules.forEach((item) => {
        const { host, path, servicePort, serviceName } = item;
        const rule = { host, path, servicePort, serviceName };
        rulesArr.push(rule);
      });
      const data = {
        name,
        maxBodySize,
        maxBodySizeUnit: 'm',
        rules: rulesArr,
      };
      await new Promise((resolve, reject) => {
        createIngress(data, {
          resolve,
          reject,
          url,
          clusterID,
          namespaceID,
        });
      });
      push(`/clusters/${clusterID}/namespaces/${namespaceID}/ingresses`);
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet
        title={messages.createPageTitle}
        description={messages.createPageDesc}
      />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/ingresses`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.createPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateIngressForm
              onSubmit={doSubmit}
              formValues={values}
              services={services}
              initialValues={fromJS({
                maxBodySize: 1,
                serviceName: targetName,
              })}
            />
            <div className={classes.buttonGroup}>
              <Button variant="contained" color="primary" onClick={submitForm}>
                <FormattedMessage {...messages.save} />
              </Button>
              <Button
                variant="contained"
                className={classes.cancleBtn}
                onClick={() => {
                  push(
                    `/clusters/${clusterID}/namespaces/${namespaceID}/ingresses`
                  );
                }}
              >
                <FormattedMessage {...messages.cancle} />
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
  url: makeSelectURL(),
  values: getFormValues(formName),
  services: makeSelectServices(),
  surl: makeSelectServicesURL(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadServices: sActions.loadServices,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreateIngressPage);
