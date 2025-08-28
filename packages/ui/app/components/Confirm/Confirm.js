import React, { Fragment, useState } from 'react';
// @mui/material components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import warningIcon from '../../images/warning.png';
import messages from './messages';

const Confirm = (props) => {
  const { component, handleConfirm, dialogContentText,disabled } = props;
  const [open, setOpen] = useState(false);
  const handleConfirmClick = () => {
    handleConfirm();
    setOpen(false);
  };
  return (
    <Fragment>
      <div
        onClick={() => {
          if(!disabled){
            setOpen(true);
          }
        }}
        style={{ display: 'inline' }}
      >
        {component}
      </div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ marginTop: 15 }}
          >
            <img
              src={warningIcon}
              style={{ marginRight: 11, verticalAlign: 'middle' }}
            />
            <FormattedMessage {...dialogContentText} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="contained"
          >
            <FormattedMessage {...messages.cancleButton} />
          </Button>
          <Button
            // onClick={handleConfirm}
            onClick={handleConfirmClick}
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

export default Confirm;
