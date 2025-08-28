/**
 *
 * DaemonSetsPage
 *
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { SimpleTable } from '../../../src/com/index.js';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete.js';

import { makeSelectLocation } from '../../ducks/app/selectors.js';
import { makeSelectCurrentID as makeSelectCurrentClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from '../../ducks/namespaces/selectors.js';
import {
  makeSelectDaemonSets,
  makeSelectDaemonSetsList,
} from '../../ducks/daemonSets/selectors.js';
import * as actions from '../../ducks/daemonSets/actions.js';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';
import UpgradeDialog from './UpgradeDialog';
import RollbackDialog from './RollbackDialog';

/* eslint-disable react/prefer-stateless-function */
export const DaemonSetsTable = ({
  location,
  data,
  clusterID,
  namespaceID,
  removeDaemonSet,
  executeDaemonSetAction,
}) => {
  const classes = useStyles();
  const pathname = location.get('pathname');
  const [dialog, setDialog] = useState([null, null]);
  const closeDialog = () => setDialog([null, null]);
  const setUpgrade = (id) => setDialog(['upgrade', id]);
  const setRollback = (id) => setDialog(['rollback', id]);
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: {
            executeDaemonSetAction,
            removeDaemonSet,
            setUpgrade,
            setRollback,
            clusterID,
            namespaceID,
          },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname,classes },
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
      <UpgradeDialog
        open={dialog[0] === 'upgrade'}
        close={closeDialog}
        id={dialog[1]}
      />
      <RollbackDialog
        open={dialog[0] === 'rollback'}
        close={closeDialog}
        id={dialog[1]}
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
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  data: makeSelectDaemonSetsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DaemonSetsTable);
