/**
 * Confirm Dialog
 */
import React, { Fragment, useState } from 'react';
import classNames from 'classnames';

// @mui/material components
import Button from '@mui/material/Button.js';
import Dialog from '@mui/material/Dialog.js';
import DialogActions from '@mui/material/DialogActions.js';
import DialogContent from '@mui/material/DialogContent.js';
import DialogContentText from '@mui/material/DialogContentText.js';
import DialogTitle from '@mui/material/DialogTitle.js';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const ConfirmDialog = ({
  open,
  onClose,
  onCancel,
  onAction,
  children,
  title,
  content,
  sureButtonText,
  hideCancleBtn,
  ...rest
}) => (
  <Dialog open={open} onClose={onClose} {...rest}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent style={{ minWidth: 300 }}>
      {content || children}
    </DialogContent>
    <DialogActions>
      {hideCancleBtn ? null : (
        <Button
          variant="contained"
          onClick={onCancel || onClose}
          style={{ backgroundColor:'#fff', border:'1px solid #D9D9D9' }}
        >
          <FormattedMessage {...messages.cancleButton} />
        </Button>
      )}
      <Button
        onClick={onAction}
        color="primary"
        variant="contained"
        style={{ marginLeft: 16, marginRight: 8}}
      >
        <FormattedMessage {...(sureButtonText || messages.sureButton)} />
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDialog.defaultProps = {
  open: false,
  children: '',
  title: '',
  content: '',
  sureButtonText: '',
};

export default ConfirmDialog;
