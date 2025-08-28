/**
 *
 * ClustersPage
 *
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Button from '@mui/material/Button.js';
import Paper from '@mui/material/Paper.js';
import { SimpleTable } from 'com';
import IconButton from '@mui/material/IconButton.js';
import DeleteIcon from '@mui/icons-material/Delete.js';
import ShellIcon from 'components/Icons/Shell.js';
import SuccessIcon from 'components/Icons/Success.js';
import FailureIcon from 'components/Icons/Failure.js';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete.js';

import * as actions from '../../../app/ducks/clusters/actions';
import { makeSelectClustersList } from '../../../app/ducks/clusters/selectors';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

export const ClustersTable = ({ data, removeCluster, setError }) => {
  const classes = useStyles();
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { classes, removeCluster, setError },
        };
      };
      if (sch.id === 'name') {
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
        data={data}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectClustersList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ClustersTable);
