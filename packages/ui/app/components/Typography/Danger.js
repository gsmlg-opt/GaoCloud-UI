import React from 'react';
import withStyles from '@mui/material/styles/withStyles';
import typographyStyle from './typographyStyle';

function Danger({ ...props }) {
  const { classes, inverse, children, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${classes.defaultFontStyle} ${classes.dangerText} ${
        inverse ? 'inverse' : ''
      }`}
    >
      {children}
    </div>
  );
}



export default withStyles(typographyStyle)(Danger);
