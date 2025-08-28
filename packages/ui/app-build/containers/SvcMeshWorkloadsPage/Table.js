/**
 *
 * SvcMeshWorkloads Table
 *
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@mui/material/Paper.js';
import { SimpleTable } from 'com';

import { makeSelectLocation } from '../../../app/ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import { makeSelectSvcMeshWorkloadsList } from '../../../app/ducks/svcMeshWorkloads/selectors';
import * as actions from '../../../app/ducks/svcMeshWorkloads/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';
import { refactorMetric } from '../../utils/svcMesh';

/* eslint-disable react/prefer-stateless-function */
const SvcMeshWorkloadsTable = ({ location, data, clusterID, namespaceID }) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname },
        };
      }
      if (sch.id === 'successRate') {
        return {
          ...sch,
          props: { classes },
        };
      }
      return sch;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={refactorMetric(data)}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SvcMeshWorkloadsTable);
