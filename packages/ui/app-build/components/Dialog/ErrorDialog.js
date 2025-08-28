/**
 * Error Dialog
 */
import React, { Fragment, useState } from 'react';
import classNames from 'classnames';

// @mui/material components
import Button from '@mui/material/Button.js';
import Dialog from '@mui/material/Dialog.js';
import DialogActions from '@mui/material/DialogActions.js';
import DialogContent from '@mui/material/DialogContent.js';
import IconButton from '@mui/material/IconButton.js';
import CloseIcon from '@mui/icons-material/Close.js';
import DialogContentText from '@mui/material/DialogContentText.js';
import DialogTitle from '@mui/material/DialogTitle.js';

import warningIcon from '../../../app/images/warning.png';

const ErrorDialog = ({
  open,
  onClose,
  children,
  title,
  content,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <IconButton onClick={onClose} style={{ float: 'right', padding: 5 }}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <div>
        <img
          src={warningIcon}
          style={{ marginRight: 11}}
        />
        {title}
      </div>
    </DialogTitle>
    <DialogContent style={{ minWidth: 300 }}>
      {content || children}
    </DialogContent>
  </Dialog>
);

ErrorDialog.defaultProps = {
  open: false,
  children: null,
  content: '',
};

export default ErrorDialog;
