/**
 *
 * Update Horizontalpodautoscaler Page
 *
 */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS, Map, List } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable.js';

import { usePush } from 'hooks/router.js';

import Helmet from 'components/Helmet/Helmet.js';
import { FormattedMessage, useIntl } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline.js';
import Button from '@mui/material/Button.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from '../../../app/ducks/horizontalPodAutoscalers/selectors';
import {
  makeSelectDeployments,
  makeSelectURL as makeDeploymentsURL,
} from '../../../app/ducks/deployments/selectors';
import {
  makeSelectStatefulSets,
  makeSelectURL as makeSelectStatefulSetsURL,
} from '../../../app/ducks/statefulSets/selectors';
import * as actions from '../../../app/ducks/horizontalPodAutoscalers/actions';
import * as stActions from '../../../app/ducks/statefulSets/actions';
import * as dActions from '../../../app/ducks/deployments/actions';
import * as mActions from '../../../app/ducks/metrics/actions';

import messages from './messages';
import useStyles from './styles';
import UpdateHPAForm, { formName } from './CreateForm';

import { renderSubmitData, refactorMetrics } from './utils/utils';
import { refactorWorklodaMetrics } from '../../utils/hpa';

export const UpdateHPAPage = ({
  updateHorizontalPodAutoscaler,
  readHorizontalPodAutoscaler,
  submitForm,
  url,
  clusterID,
  namespaceID,
  id,
  current,
  values,
  loadDeployments,
  loadStatefulSets,
  stUrl,
  deployUrl,
  deployments,
  statefulsets,
  loadMetrics,
}) => {
  const classes = useStyles();
  const push = usePush();
  const intl = useIntl();
  const [metrics, setMetrics] = useState(Map({}));
  const scaleTargetKind = values && values.get('scaleTargetKind');
  const scaleTargetName = values && values.get('scaleTargetName');
  let hpa = Map({});

  useEffect(() => {
    loadDeployments(deployUrl, { clusterID, namespaceID });
    loadStatefulSets(stUrl, { clusterID, namespaceID });
  }, [
    clusterID,
    namespaceID,
    loadDeployments,
    deployUrl,
    loadStatefulSets,
    stUrl,
  ]);

  useEffect(() => {
    if (id) {
      readHorizontalPodAutoscaler(id, {
        url: `${url}/${id}`,
        clusterID,
        namespaceID,
      });
    }
    return () => {};
  }, [clusterID, namespaceID, id, readHorizontalPodAutoscaler, url]);

  useEffect(() => {
    if (scaleTargetKind && scaleTargetName) {
      let metricsUrl = '';
      switch (scaleTargetKind) {
        case 'deployment':
          metricsUrl = deployments.getIn([scaleTargetName, 'links', 'metrics']);
          break;
        case 'statefulset':
          metricsUrl = statefulsets.getIn([
            scaleTargetName,
            'links',
            'metrics',
          ]);
          break;
        default:
          break;
      }
      loadMetrics(metricsUrl, {
        clusterID,
        namespaceID,
        scaleTargetName,
        resolve({ response }) {
          setMetrics(fromJS(refactorWorklodaMetrics(response.data)));
        },
        reject() {},
      });
    }
    return () => {};
  }, [
    clusterID,
    namespaceID,
    loadMetrics,
    scaleTargetKind,
    scaleTargetName,
    deployments,
    statefulsets,
  ]);

  async function doSubmit(formValues) {
    try {
      const data = renderSubmitData(formValues);
      delete data.metricsType;

      await new Promise((resolve, reject) => {
        updateHorizontalPodAutoscaler(data, {
          resolve,
          reject,
          url: `${url}/${id}`,
          clusterID,
          namespaceID,
        });
      });
      push(
        `/clusters/${clusterID}/namespaces/${namespaceID}/horizontalPodAutoscalers`
      );
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  if (current.size !== 0) {
    const data = current.toJS();
    const { resourceMetrics, customMetrics, ...formData } = data;
    const arr = refactorMetrics(data, intl, 'update');
    data.metrics = arr.filter((l) => l !== undefined);
    data.metricsType = 'resourceMetrics';
    delete data.resourceMetrics;
    delete data.customMetrics;
    hpa = fromJS(data);
  }

  return (
    <div className={classes.root}>
      <Helmet
        title={messages.updatePageTitle}
        description={messages.updatePageDesc}
      />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/horizontalPodAutoscalers`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.updatePageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            {current.size === 0 ? null : (
              <UpdateHPAForm
                onSubmit={doSubmit}
                formValues={values}
                initialValues={hpa}
                deployments={deployments}
                statefulsets={statefulsets}
                type="update"
                metrics={metrics}
              />
            )}
            <div className={classes.buttonGroup}>
              <Button variant="contained" color="primary" onClick={submitForm}>
                <FormattedMessage {...messages.update} />
              </Button>
              <Button
                variant="contained"
                className={classes.cancleBtn}
                onClick={() => {
                  push(
                    `/clusters/${clusterID}/namespaces/${namespaceID}/horizontalPodAutoscalers`
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
  current: makeSelectCurrent(),
  id: makeSelectCurrentID(),
  values: getFormValues(formName),
  stUrl: makeSelectStatefulSetsURL(),
  deployUrl: makeDeploymentsURL(),
  deployments: makeSelectDeployments(),
  statefulsets: makeSelectStatefulSets(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadDeployments: dActions.loadDeployments,
      loadStatefulSets: stActions.loadStatefulSets,
      loadMetrics: mActions.loadMetrics,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpdateHPAPage);
