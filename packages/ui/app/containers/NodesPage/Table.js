/**
 *
 * NodesPage
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';

import { SimpleTable } from '../../../src/com/index.js';

import { makeSelectNodes, makeSelectNodesList } from '../../ducks/nodes/selectors.js';
import { makeSelectLocation } from '../../ducks/app/selectors.js';
import * as actions from '../../ducks/nodes/actions.js';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const NodesTable = ({
  location,
  data,
  clusterID,
  executeNodeAction,
  setError,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const mapedSchema = schema
    .map((sche) => ({
      ...sche,
      label: <FormattedMessage {...messages[`tableTitle${sche.label}`]} />,
    }))
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { classes, executeNodeAction, setError },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname,classes },
        };
      }
      return sch;
    });

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable className={classes.table} schema={mapedSchema} data={data} />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectNodesList(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NodesTable);
