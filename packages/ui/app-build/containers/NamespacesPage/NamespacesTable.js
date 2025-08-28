/**
 *
 * NamespacesPage
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
import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../../app/ducks/clusters/selectors';
import * as actions from '../../../app/ducks/namespaces/actions';
import {
  makeSelectNamespaces,
  makeSelectNamespacesList,
} from '../../../app/ducks/namespaces/selectors';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

export const NamespacesTable = ({
  clusterID,
  data,
  namespaces,
  removeNamespace,
  location,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { clusterID, removeNamespace },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname ,classes},
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
        data={data}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  clusterID: makeSelectCurrentClusterID(),
  namespaces: makeSelectNamespaces(),
  data: makeSelectNamespacesList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NamespacesTable);
