/**
 *
 * Menubar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';
import { withStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudIcon from '@mui/icons-material/Cloud';
import logo from 'images/page-logo.png';

import logoICon from 'images/logo.svg';
import ZcloudICon from 'images/Zcloud.svg';
import ZcloudWhiteICon from 'images/ZcloudWhite.svg';


import MenuIcon from 'components/Icons/Menu';
import MenuRotateIcon from 'components/Icons/MenuRotate';
import Brand from 'components/Brand/Brand';

import styles from './styles';

function Menubar({
  classes,
  headerLeftContent,
  headerRightContent,
  onClickMenuButton,
  showMenuText,
}) {
  return (
    <AppBar className={classes.appBar}>
      <Toolbar disableGutters className={classes.toolbar}>
        <div className={classes.toolbarLeft}>
          <div className={classes.content}>
            <div className={classes.menuButton} >
              <IconButton onClick={onClickMenuButton}>
                {showMenuText?  <MenuIcon className={classes.menuIcon} /> :  <MenuRotateIcon className={classes.menuIcon} />}
              </IconButton>
            </div>
            <div className={classes.logoIconWrapper}>
              <img src={logoICon} alt="logo" className={classes.logoIcon} />
              <img src={ZcloudWhiteICon} alt="Zcloud" className={classes.logoName} />
            </div>
          </div>
          {headerLeftContent}
        </div>
        <div className={classes.toolbarRight}>{headerRightContent}</div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Menubar);
