import React from 'react';
import PropTypes from 'prop-types';
// @mui/material components
import withStyles from '@mui/material/styles/withStyles';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
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

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(footerStyle)(Footer);
