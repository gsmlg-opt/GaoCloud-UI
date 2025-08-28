/**
 *
 * AuditLogs Table
 *
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@mui/material/Paper';
import { SimpleTable } from '../../../src/com/index.js';

import {
  makeSelectLocation,
} from '../../ducks/app/selectors.js';
import {
  makeSelectAuditLogsList,
} from '../../ducks/auditLogs/selectors.js';
import * as actions from '../../ducks/auditLogs/actions.js';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const AuditLogsTable = ({
  location,
  data,
  removeAuditLog,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'detail') {
        return {
          ...sch,
          props: { classes},
        };
      };
      if (sch.id === 'resourcePath') {
        return {
          ...sch,
          props: {classes},
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
  data: makeSelectAuditLogsList(),
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
)(AuditLogsTable);
