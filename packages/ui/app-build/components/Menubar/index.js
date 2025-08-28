/**
 *
 * Menubar
 *
 */

import React from 'react';

// import styled from 'styled-components';
import { withStyles } from '@mui/styles.js';
import AppBar from '@mui/material/AppBar.js';
import Toolbar from '@mui/material/Toolbar.js';
import Typography from '@mui/material/Typography.js';
import IconButton from '@mui/material/IconButton.js';
import CloudIcon from '@mui/icons-material/Cloud.js';
import logo from '../../../app/images/page-logo.png';

import logoICon from '../../../app/images/logo.svg';
import ZcloudICon from '../../../app/images/Zcloud.svg';
import ZcloudWhiteICon from '../../../app/images/ZcloudWhite.svg';


import MenuIcon from 'components/Icons/Menu.js';
import MenuRotateIcon from 'components/Icons/MenuRotate.js';
import Brand from 'components/Brand/Brand.js';

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
