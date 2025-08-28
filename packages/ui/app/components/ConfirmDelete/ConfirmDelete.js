import React, { Fragment, useState } from 'react';
import IconButton from '../CustomIconButtons/IconButton.js';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CButton from '../CustomButtons/Button.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import removeICon from '../../images/icons/remove.svg';
import warningIcon from '../../images/warning.png';
import messages from './messages';

const ConfirmDelete = ({
  id,
  actionName,
  url,
  clusterID,
  namespaceID,
  resolve,
  reject,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    actionName(id, { url, clusterID, namespaceID, resolve, reject });
    setOpen(false);
  };

  return (
    <Fragment>
      <CButton
        action 
        onClick={() => {
          setOpen(true);
        }}
        disabled={disabled}
      >
        <FormattedMessage {...messages.deleteButton} />
      </CButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage {...messages.dialogTitle} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img
              src={warningIcon}
              style={{ marginRight: 11, verticalAlign: 'middle' }}
            />
            <FormattedMessage {...messages.dialogContentText} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            style={{ backgroundColor: '#fff', border: '1px solid #D9D9D9' }}
            variant="contained"
          >
            <FormattedMessage {...messages.cancleButton} />
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            style={{ marginLeft: 16, marginRight: 8 }}
          >
            <FormattedMessage {...messages.sureButton} />
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmDelete;
