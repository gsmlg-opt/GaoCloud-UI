import React from 'react';
import classNames from 'classnames';
// @mui/material components
import Snack from '@mui/material/SnackbarContent.js';
import IconButton from '@mui/material/IconButton.js';
// @mui/icons-material
import CloseIcon from 'components/Icons/Close.js';
// core components
import useStyles from './styles';

export default function SnackbarContent(props) {
  const classes = useStyles();
  const { message, color, close, icon } = props;
  let action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined,
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <CloseIcon className={classes.close} />
      </IconButton>,
    ];
  }
  return (
    <Snack
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: `${classes.root} ${classes[color]}`,
        message: classes.message,
      }}
      action={action}
    />
  );
}

