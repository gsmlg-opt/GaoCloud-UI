import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@mui/material/styles';
import logo from 'images/favicon.png';

import styles from './styles';

const Brand = ({ classes }) => (
  <div className={classes.logo}>
    <a href="https://www.zdns.cn" className={classNames(classes.logoLink)}>
      <div className={classes.logoImage}>
        <img src={logo} alt="logo" className={classes.img} />
      </div>
      ZCLOUD
    </a>
  </div>
);



export default withStyles(styles)(Brand);
