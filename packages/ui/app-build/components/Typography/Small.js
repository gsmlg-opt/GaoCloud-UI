import React from 'react';
// nodejs library to set properties for components
// @mui/material components
import withStyles from '@mui/styles.js';
// core components
import typographyStyle from './typographyStyle';

function Small({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={`${classes.defaultFontStyle} ${classes.smallText}`}>
      {children}
    </div>
  );
}



export default withStyles(typographyStyle)(Small);
