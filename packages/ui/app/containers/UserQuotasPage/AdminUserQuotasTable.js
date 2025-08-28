/**
 *
 * User Quotas Table
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

import * as actions from '../../ducks/userQuotas/actions.js';
import {
  makeSelectUserQuotas,
  makeSelectUserQuotasList,
} from '../../ducks/userQuotas/selectors.js';

import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete.js';

import messages from './messages';
import useStyles from './styles';
import schema from './adminTableSchema';

const AdminUserQuotasTable = ({ data, removeUserQuota, filter, setError }) => {
  const classes = useStyles();
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { classes, removeUserQuota, setError },
        };
      };
      if (sch.id === 'namespace') {
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
        data={data.filter((item) => {
          let flag = true;
          if (filter.userName) {
            flag = flag && item.get('userName') === filter.userName;
          }
          if (filter.status && filter.status !== 'all') {
            flag = flag && item.get('status') === filter.status;
          }
          return flag;
        })}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  userQuotas: makeSelectUserQuotas(),
  data: makeSelectUserQuotasList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminUserQuotasTable);
