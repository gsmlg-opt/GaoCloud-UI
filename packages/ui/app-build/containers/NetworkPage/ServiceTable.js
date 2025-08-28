/**
 *
 * Service Table
 *
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles.js';
import Button from '@mui/material/Button.js';
import Paper from '@mui/material/Paper.js';
import { SimpleTable } from 'com';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

const ServiceTable = ({ data }) => {
  const classes = useStyles();
  const mergedSchema = schema.map((s) => ({
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

export default ServiceTable;
