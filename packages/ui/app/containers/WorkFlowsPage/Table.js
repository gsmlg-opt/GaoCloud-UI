/**
 *
 * WorkFlows Table
 *
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Map, List } from 'immutable';

import Paper from '@mui/material/Paper';
import { SimpleTable } from '../../../src/com/index.js';

import {
  makeSelectLocation,
} from '../../ducks/app/selectors.js';
import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import {
  makeSelectWorkFlowsList,
  makeSelectURL,
} from '../../ducks/workFlows/selectors.js';
import * as actions from '../../ducks/workFlows/actions.js';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';
import RunDialog from './RunDialog';

/* eslint-disable react/prefer-stateless-function */
const WorkFlowsTable = ({
  location,
  data,
  clusterID,
  namespaceID,
  removeWorkFlow,
  loadWorkFlows,
  url,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const [dialog, setRunDialog] = useState(null);
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: {
            removeWorkFlow,
            clusterID,
            namespaceID,
            setRunDialog,
          },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname },
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
      <RunDialog
        open={dialog}
        close={()=>{
          setRunDialog(null);
          loadWorkFlows(url, {
            clusterID,
            namespaceID,
          });
        }}
        id={dialog}
        workFlow={dialog}
      />
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
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  data: makeSelectWorkFlowsList(),
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(WorkFlowsTable);
