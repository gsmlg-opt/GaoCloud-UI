/**
 * Error Dialog
 */
import React, { Fragment, useState } from 'react';
import classNames from 'classnames';

// @mui/material components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import warningIcon from '../../images/warning.png';

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
