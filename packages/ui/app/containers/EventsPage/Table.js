/**
 *
 * Events Table
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { SimpleTable } from '../../../src/com/index.js';

import { makeSelectEvents } from '../../ducks/events/selectors.js';
import * as actions from '../../ducks/events/actions.js';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

const EventsTable = ({ events, filters }) => {
  const classes = useStyles();
  const allFilter = '__all__';
  const mergedSchema = schema.map((s) => ({
    ...s,
    label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
  }));

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={events
          .filter((evt) => {
            let flag = true;
            if (filters.get('type') !== allFilter) {
              flag = flag && filters.get('type') === evt.type;
            }
            if (filters.get('namespace') !== allFilter) {
              flag = flag && filters.get('namespace') === evt.namespace;
            }
            if (filters.get('kind') !== allFilter) {
              flag = flag && filters.get('kind') === evt.kind;
            }
            if (filters.get('name') !== allFilter) {
              flag = flag && filters.get('name') === evt.name;
            }
            return flag;
          })
          .reverse()}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EventsTable);
