/**
 *
 * ShowHPAPagePage
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS, List as list } from 'immutable';

import { withStyles } from '@mui/styles.js';
import CssBaseline from '@mui/material/CssBaseline.js';
import List from '@mui/material/List.js';
import ListItem from '@mui/material/ListItem.js';
import ListItemText from '@mui/material/ListItemText.js';
import Button from '@mui/material/Button.js';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';
import Helmet from 'components/Helmet/Helmet.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import * as actions from '../../../app/ducks/horizontalPodAutoscalers/actions';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from '../../../app/ducks/horizontalPodAutoscalers/selectors';

import messages from './messages';
import useStyles from './styles';

import {
  refactorMetrics,
  renderMetricsTypeValue,
  renderInputMetricsName,
  renderReadOnlyNumerical,
  renderTargetTypeValue,
} from './utils/utils';

export const HPADetailPage = ({
  clusterID,
  namespaceID,
  id,
  url,
  hpa,
  readHorizontalPodAutoscaler,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  let metrics = list([]);
  useEffect(() => {
    readHorizontalPodAutoscaler(id, {
      url: `${url}/${id}`,
      clusterID,
      namespaceID,
    });
    return () => {};
  }, [clusterID, namespaceID, id, readHorizontalPodAutoscaler, url]);

  if (hpa.size !== 0) {
    const data = hpa.toJS();
    const arr = refactorMetrics(data, intl, 'show');
    metrics = fromJS(arr.filter((l) => l !== undefined));
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/horizontalPodAutoscalers`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.showPageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.showHPA} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.formName} />}
                      value={hpa && hpa.get('name')}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formScaleTargetKind} />
                      }
                      value={hpa && hpa.get('scaleTargetKind')}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formScaleTargetName} />
                      }
                      value={hpa && hpa.get('scaleTargetName')}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formMinReplicas} />
                      }
                      value={hpa && hpa.get('minReplicas')}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formMaxReplicas} />
                      }
                      value={hpa && hpa.get('maxReplicas')}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <List component="ul" className={classes.noPaddingList}>
                  {metrics.size > 0 &&
                    metrics.map((c, i) => {
                      const metricsType =
                        metrics && metrics.getIn([i, 'metricsType']);
                      const metricsTypeValue = renderMetricsTypeValue(
                        metricsType
                      );
                      const targetType =
                        metrics && metrics.getIn([i, 'targetType']);
                      const targetTypeValue = renderTargetTypeValue(targetType);
                      const metricsName = renderInputMetricsName(metricsType);
                      return (
                        <Card key={i} border>
                          <CardBody>
                            <ListItem key={i}>
                              <ListItemText>
                                <GridContainer>
                                  <GridItem xs={3} sm={3} md={3}>
                                    <ReadOnlyInput
                                      labelText={
                                        <FormattedMessage
                                          {...messages.formMetricsType}
                                        />
                                      }
                                      fullWidth
                                      value={
                                        metricsTypeValue &&
                                        intl.formatMessage(metricsTypeValue)
                                      }
                                    />
                                  </GridItem>
                                  <GridItem xs={3} sm={3} md={3}>
                                    <ReadOnlyInput
                                      labelText={
                                        <FormattedMessage
                                          {...messages.formMetricName}
                                        />
                                      }
                                      fullWidth
                                      title={c.get(`${metricsName}`)}
                                      value={c.get(`${metricsName}`)}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  <GridItem xs={3} sm={3} md={3}>
                                    <ReadOnlyInput
                                      labelText={
                                        <FormattedMessage
                                          {...messages.formTargetType}
                                        />
                                      }
                                      fullWidth
                                      value={
                                        targetTypeValue &&
                                        intl.formatMessage(targetTypeValue)
                                      }
                                    />
                                  </GridItem>
                                  <GridItem xs={3} sm={3} md={3}>
                                    {renderReadOnlyNumerical(c, i, metrics)}
                                  </GridItem>
                                </GridContainer>
                              </ListItemText>
                            </ListItem>
                          </CardBody>
                        </Card>
                      );
                    })}
                </List>
              </CardBody>
            </Card>
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
  url: makeSelectURL(),
  hpa: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HPADetailPage);
