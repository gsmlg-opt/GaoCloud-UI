import React from 'react';
// nodejs library to set properties for components

// mterial-ui components
import withStyles from '@mui/styles.js';

const style = {
  clearfix: {
    '&:after,&:before': {
      display: 'table',
      content: ' "',
    },
    '&:after': {
      clear: 'both',
    },
  },
};

function Clearfix({ ...props }) {
  const { classes } = props;
  return <div className={classes.clearfix} />;
}



export default withStyles(style)(Clearfix);
