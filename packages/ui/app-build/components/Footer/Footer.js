import React from 'react';
// @mui/material components
import withStyles from '@mui/styles.js';
import ListItem from '@mui/material/ListItem.js';
import List from '@mui/material/List.js';
// core components
import footerStyle from './footerStyle';

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left} />
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{' '}
            <a href="https://www.zdns.cn" className={classes.a}>
              ZCloud
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}



export default withStyles(footerStyle)(Footer);
