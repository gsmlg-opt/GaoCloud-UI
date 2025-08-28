/**
 *
 * Svc Mesh Tap Table
 *
 */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import throttleRender from 'com/throttleRender.js';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button.js';
import Paper from '@mui/material/Paper.js';
import { SimpleTable } from 'com';
import IconButton from '@mui/material/IconButton.js';
import DeleteIcon from '@mui/icons-material/Delete.js';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete.js';
import Dialog from '@mui/material/Dialog.js';
import DialogActions from '@mui/material/DialogActions.js';
import DialogContent from '@mui/material/DialogContent.js';
import DialogTitle from '@mui/material/DialogTitle.js';

import { makeSelectLocation } from '../../../app/ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import { makeSelectSvcMeshTapsList } from '../../../app/ducks/svcMeshTap/selectors';
import * as actions from '../../../app/ducks/svcMeshTap/actions';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';
import RequestDetail from './RequestDetail';

const TapTable = ({ data, clusterID, namespaceID }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'self') {
        return {
          ...sch,
          props: { setOpen },
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
      <Dialog
        maxWidth="md"
        fullWidth
        open={Boolean(open)}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Request Details</DialogTitle>
        <DialogContent>
          <RequestDetail data={open} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  data: makeSelectSvcMeshTapsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(throttleRender(TapTable, 400));
