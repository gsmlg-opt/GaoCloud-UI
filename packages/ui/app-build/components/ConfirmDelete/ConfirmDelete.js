import React, { Fragment, useState } from 'react';
import IconButton from 'components/CustomIconButtons/IconButton.js';
import DeleteIcon from '@mui/icons-material/Delete.js';
import Button from '@mui/material/Button.js';
import CButton from 'components/CustomButtons/Button.js';
import Dialog from '@mui/material/Dialog.js';
import DialogActions from '@mui/material/DialogActions.js';
import DialogContent from '@mui/material/DialogContent.js';
import DialogContentText from '@mui/material/DialogContentText.js';
import DialogTitle from '@mui/material/DialogTitle.js';
import { FormattedMessage, injectIntl } from 'react-intl';
import removeICon from '../../../app/images/icons/remove.svg';
import warningIcon from '../../../app/images/warning.png';
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
