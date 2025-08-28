import React, { Fragment, useState } from 'react';
import Button from '../CustomButtons/Button.js';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@mui/styles';
import ChevronBottom from '../Icons/ChevronBottom.js';
import Popper from '@mui/material/Popper';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import messages from './messages';
import styles from './styles';

const TableActions = ({
  actions,
  classes,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button
        action
        onClick={handleClick}
        className={classes.moreButton}
      >
        <FormattedMessage {...messages.moreButton} />
        <ChevronBottom
          className={classes.chevronBottom}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          handleClose();
        }}
        classes={{ paper: classes.selectMenu }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        elevation={0}
        getContentAnchorEl={null}
      >
        {actions.map((a,i)=>(
          <MenuItem
            key={i}
            onClick={() => {
              handleClose();
            }}
            className={classes.menuItem}
          >
            {a}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default withStyles(styles)(TableActions);
// export default TableActions;
