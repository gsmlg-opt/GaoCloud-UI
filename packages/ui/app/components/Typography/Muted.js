import React from 'react';
import withStyles from '@mui/material/styles/withStyles';
import typographyStyle from './typographyStyle';

function Muted({ ...props }) {
  const { classes, children, inverse, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${classes.defaultFontStyle} ${classes.mutedText} ${
        inverse ? 'inverse' : ''
      }`}
    >
      {children}
    </div>
  );
}



export default withStyles(typographyStyle)(Muted);
