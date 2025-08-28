/**
 *
 * Ingress Table
 *
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Paper from '@mui/material/Paper.js';
import { SimpleTable } from 'com';

import * as actions from '../../../app/ducks/ingresses/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './ruleTableSchema';

/* eslint-disable react/prefer-stateless-function */
const IngressRuleTable = ({ ingress }) => {
  const classes = useStyles();
  const mergedSchema = schema.map((s) => ({
    ...s,
    label: <FormattedMessage {...messages[`form${s.label}`]} />,
  }));

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={ingress.get('rules') || []}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(IngressRuleTable);
